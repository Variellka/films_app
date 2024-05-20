import { Button, Flex, Modal, Rating, Stack, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDataForModal, getRateModalState } from '../../../selectors/getRateModal';
import { AppDispatch } from '../../../app_/store';
import { useCallback, useEffect, useState } from 'react';
import { rateModalSliceActions } from '../../../slices/rateModalSlice';
import { deleteMovieRating, updateMovieRating } from '../../../utils/changeMovieRating';

const RateMovieModal = () => {
    const rateModalState = useSelector(getRateModalState);
    const movie = useSelector(getMovieDataForModal);
    const dispatch = useDispatch<AppDispatch>();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
        const movieSavedRating = moviesRating?.find((item) => item.id === movie?.id)?.rating || 0
        setRating(Number(movieSavedRating))
      }, [movie?.id, rateModalState]);

    const onClose = useCallback(() => {
        dispatch(rateModalSliceActions.setModal(false))
        setRating(0)
    }, [dispatch])

    const onRateMovie = useCallback((value) => {
        setRating(value)
    }, [])

    const onSaveRating = useCallback(() => {
        rating !== 0 ? updateMovieRating(movie?.id, rating) : deleteMovieRating(movie.id);
        dispatch(rateModalSliceActions.setModal(false))
        setRating(0)
    }, [dispatch, movie, rating])

    const onCancelRating = useCallback(() => {
        deleteMovieRating(movie.id)
        dispatch(rateModalSliceActions.setModal(false))
        setRating(0)
    }, [dispatch, movie?.id])

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