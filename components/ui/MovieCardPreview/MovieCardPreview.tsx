import { Button, Flex, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app_/store";
import { getGenresData } from "../../../selectors/getGenres";
import { rateModalSliceActions } from "../../../slices/rateModalSlice";
import { formatVote } from "../../../utils/formatFunctions";
import styles from './MovieCardPreview.module.css';
import { getRateModalState } from "../../../selectors/getRateModal";
import { useMediaQuery } from "@mantine/hooks";

const MovieCardPreview = ({movie}) => {
    const genres = useSelector(getGenresData);
    const genresNames = genres 
    ? movie?.genre_ids?.map(id => genres.find(obj => obj.id === id)?.name) ||
    movie?.genres?.map(genre => genre.name)
    : null;
    const genresDecoded = genresNames?.length > 2 ? genresNames?.splice(0,2).join(', ') + '...' : genresNames?.join(', ');
    const isSmallScreen = useMediaQuery('(max-width: 768px)');

    const dispatch = useDispatch<AppDispatch>();
    const modalState = useSelector(getRateModalState)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if  (movie?.id && !modalState) {
            const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
            const movieSavedRating = moviesRating?.find((item) => item.id === movie?.id)?.rating
            setRating(movieSavedRating)
        }
    }, [movie?.id, modalState])

    const onModalOpen = useCallback(() => {
        dispatch(rateModalSliceActions.setMovieData(movie))
        dispatch(rateModalSliceActions.setModal(true))
    }, [dispatch, movie])

    return (
        <Flex justify='space-between' p={isSmallScreen ? 5 : 24} bg="white" style={{ borderRadius: '10px' }}>
            <Flex gap={16} direction={isSmallScreen ? 'column' : 'row'}>
                <Image 
                    alt={movie?.original_title} 
                    src={movie?.poster_path ? 
                        `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` 
                        : '/noPoster.png'} 
                    h={170}
                    w={119}
                />
                <Stack align="stretch" justify="space-between">
                    <Stack gap={8} >
                        <Link href={`movies/${movie?.id}`} className={styles.MovieTitle}>
                        <Text 
                            size={isSmallScreen ? 'md' : "xl"} 
                            fw={500} 
                            maw={240}
                            className={styles.MovieTitle}
                        >
                            {movie?.title}
                        </Text>
                        </Link>
                        
                        <Text size="md" className={styles.MovieDate}>{movie?.release_date?.split('-')[0]}</Text>
                        <Flex>
                            <Image src='/Star.svg' alt="rating" w={28} h={28} mr={4}/>
                            <Text size="md" fw={600}>{movie?.vote_average?.toFixed(1)}
                                <Text span fw={400} className={styles.MovieVote}>{` (${formatVote(movie?.vote_count)})`}</Text>
                            </Text>
                        </Flex>
                    </Stack>
                    <Text lineClamp={1}>
                        <Text span mr={8} className={styles.MovieGenre}>Genres</Text>
                        {genresDecoded?.length ? genresDecoded : null}
                    </Text>
                </Stack>
            </Flex>
            <Button variant="transparent" onClick={onModalOpen} p={0} className={styles.RateButton} w='30%'>
                <Image src={rating ? '/starFilled.svg' : '/StarEmpty.svg'} alt="give a rate" w={28} h={28} key='rateStar'/>
                {rating ? <Text fw={600} c='black' ml={4}>{rating}</Text> : null}
            </Button>
        </Flex>
    );
};

export default MovieCardPreview;