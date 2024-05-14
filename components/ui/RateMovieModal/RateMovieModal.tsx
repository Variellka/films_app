import { Button, Flex, Modal, Rating, Stack, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDataForModal, getRateModalState } from '../../../selectors/getRateModal';
import { AppDispatch } from '../../../app_/store';
import { useCallback, useEffect, useState } from 'react';
import { rateModalSliceActions } from '../../../slices/rateModalSlice';

const RateMovieModal = () => {
    const rateModalState = useSelector(getRateModalState);
    const movie = useSelector(getMovieDataForModal);
    const dispatch = useDispatch<AppDispatch>();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const item = localStorage.getItem(String(movie?.id));
        if (item) {
            setRating(Number(item));
        }
      }, [movie?.id]);

    const onClose = useCallback(() => {
        dispatch(rateModalSliceActions.setModal(false))
        setRating(0)
    }, [dispatch])

    const onRateMovie = useCallback((value) => {
        setRating(value)
    }, [])

    const onSaveRating = useCallback(() => {
        localStorage.setItem(String(movie.id), String(rating))
        dispatch(rateModalSliceActions.setModal(false))
    }, [dispatch, movie, rating])

    const onCancelRating = useCallback(() => {
        localStorage.removeItem(String(movie.id));
        setRating(0)
    }, [movie?.id])

    return (
        <Modal 
            opened={rateModalState} 
            onClose={onClose} 
            title="Your rating" 
            centered
            size="auto"
            key='rateModal'
        >
            <Stack>
                <Text fw={700}>{movie?.original_title}</Text>
                <Rating value={rating} count={10} size="xl" onChange={onRateMovie}/>
                <Flex >
                    <Button variant='filled' onClick={onSaveRating}>Save</Button>
                    <Button variant='transparent' onClick={onCancelRating}>Remove rating</Button>
                </Flex>
            </Stack>
        </Modal>
    );
};

export default RateMovieModal;