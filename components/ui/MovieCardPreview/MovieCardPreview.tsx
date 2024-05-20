import { Button, Flex, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app_/store";
import { getGenresData } from "../../../selectors/getGenres";
import { rateModalSliceActions } from "../../../slices/rateModalSlice";
import { formatVote } from "../../../utils/formatFunctions";
import styles from './MovieCardPreview.module.css';
import { getRateModalState } from "../../../selectors/getRateModal";

const MovieCardPreview = ({movie}) => {
    const {pathname} = useRouter();
    const genres = useSelector(getGenresData);
    const genresDecoded = genres 
    ? movie.genre_ids.map(id => genres.find(obj => obj.id === id)?.name).join(', ') 
    : null;
    const dispatch = useDispatch<AppDispatch>();
    const modalState = useSelector(getRateModalState)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if  (movie?.id && !modalState) {
            const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '{}');
            const movieSavedRating = moviesRating?.find((item) => item.id === movie?.id)?.rating
            setRating(movieSavedRating)
        }
    }, [movie?.id, modalState])

    const onModalOpen = useCallback(() => {
        dispatch(rateModalSliceActions.setMovieData(movie))
        dispatch(rateModalSliceActions.setModal(true))
    }, [dispatch, movie])

    return (
        <Flex justify='space-between' p={24} bg="white" style={{ borderRadius: '10px' }}>
            <Flex gap={16}>
                <Image 
                    alt={movie?.original_title} 
                    src={movie?.poster_path ? 
                        `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` 
                        : '/noPoster.png'} 
                    h={170}
                    w={119}
                />
                <Stack align="stretch" justify="space-between">
                    <Stack gap={8}>
                        <Link href={`${pathname}/${movie.id}`} className={styles.MovieTitle}>
                        <Text 
                            size="xl" 
                            fw={500} 
                            
                        >
                            {movie?.original_title}
                        </Text>
                        </Link>
                        
                        <Text size="md" className={styles.MovieDate}>{movie?.release_date.split('-')[0]}</Text>
                        <Flex>
                            <Image src='/Star.svg' alt="rating" w={28} h={28} mr={4}/>
                            <Text size="md" fw={600}>{movie?.vote_average.toFixed(1)}
                                <Text span fw={400} className={styles.MovieVote}>{` (${formatVote(movie?.vote_count)})`}</Text>
                            </Text>
                        </Flex>
                    </Stack>
                    <Text>
                        <Text span mr={8} className={styles.MovieGenre}>Genres</Text>
                        {genresDecoded}
                    </Text>
                </Stack>
            </Flex>
            <Button variant="transparent" onClick={onModalOpen} p={0} ml={10}>
                <Image src={rating ? '/starFilled.svg' : '/StarEmpty.svg'} alt="give a rate" w={28} h={28} key='rateStar'/>
                {rating ? <Text fw={600} c='black' ml={4}>{rating}</Text> : null}
            </Button>
        </Flex>
    );
};

export default MovieCardPreview;