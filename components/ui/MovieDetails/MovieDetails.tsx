import { AspectRatio, Button, Flex, Image, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app_/store";
import { 
    getMovieDetailsData, 
    getMovieDetailsError, 
    getMovieDetailsIsLoading 
} from "../../../selectors/getMovieDetails";
import { getRateModalState } from "../../../selectors/getRateModal";
import { rateModalSliceActions } from "../../../slices/rateModalSlice";
import { formatCurrency, formatDate, formatTime, formatVote } from "../../../utils/formatFunctions";
import Loader from "../Loader/Loader";
import MovieBreadcrumbs from "../MovieBreadcrumbs/MovieBreadcrumbs";
import styles from './MovieDetails.module.css';
import { IMovieRating, IVideo } from "../../../utils/types";

const MovieDetails = () => {
    const movie = useSelector(getMovieDetailsData)
    const isLoading = useSelector(getMovieDetailsIsLoading)
    const error = useSelector(getMovieDetailsError)
    const dispatch = useDispatch<AppDispatch>();
    const modalState = useSelector(getRateModalState)
    const [rating, setRating] = useState(0)
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const router = useRouter()

    useEffect(() => {
        if  (movie?.id && !modalState) {
            const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
            const movieSavedRating = moviesRating?.find((item: IMovieRating) => item.id === movie?.id)?.rating
            setRating(movieSavedRating)
        }
    }, [movie?.id, modalState])

    const onModalOpen = useCallback(() => {
        dispatch(rateModalSliceActions.setMovieData(movie))
        dispatch(rateModalSliceActions.setModal(true))
    }, [dispatch, movie])

    if (isLoading) {
        return (
            <Loader isLoading={isLoading} key='loading'/>
        )
    }

    if (error) {
        return (
            <>
                {router.push("/404")}
            </>
        )   
    }

    return (
        <Stack maw={800} className={styles.MovieDetails}>
            <MovieBreadcrumbs items={[
                { title: 'Movies', href: '/movies' },
                { title: movie?.title},
            ]}/>
            <Flex 
                justify='space-between' 
                key='movieDetails' 
                p={isSmallScreen ? 0 : 24} 
                className={styles.Wrapper}
            >
                <Flex gap={16} direction={isSmallScreen ? 'column' : 'row'}>
                    <Image 
                        alt={movie?.title} 
                        src={movie?.poster_path ? 
                            `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                            : '/noPoster.png'} 
                        h={352}
                        w={isSmallScreen ? 150 :250}
                    />
                    <Stack align="stretch" justify="space-between">
                        <Stack gap={8}>
                            <Text 
                                size="xl" 
                                fw={500}   
                                className={styles.MovieTitle}
                            >
                                {movie?.title}
                            </Text>
                            <Text size="md" className={styles.subtitle}>
                                {movie?.release_date?.split('-')[0]}
                            </Text>
                            <Flex>
                                <Image src='/Star.svg' alt="rating" w={28} h={28} mr={4}/>
                                <Text size="md" fw={600}>{movie?.vote_average?.toFixed(1)}
                                    <Text span fw={400} c='var(--grey-600)'>
                                        &nbsp;{`(${movie?.vote_count ? formatVote(movie?.vote_count) : 0})`}
                                    </Text>
                                </Text>
                            </Flex>
                        </Stack>
                        <Stack gap={isSmallScreen ? 4 : 13}>
                            <Text size={isSmallScreen? 'sm' : 'md'} style={{display: 'flex'}}>
                                <Text  mr={8} miw={140} className={styles.subtitle}>Duration </Text>
                                {formatTime(movie?.runtime ? movie?.runtime : 0)}
                            </Text>
                            <Text size={isSmallScreen? 'sm' : 'md'} style={{display: 'flex'}}>
                                <Text  mr={8} miw={140} className={styles.subtitle}>Premiere </Text>
                                {formatDate(movie?.release_date ? movie?.release_date : '')}
                            </Text>
                            <Text size={isSmallScreen? 'sm' : 'md'} style={{display: 'flex'}}>
                                <Text  mr={8} miw={140} className={styles.subtitle}>Budget </Text>
                                {formatCurrency(movie?.budget ? movie?.budget: 0)}
                            </Text>
                            <Text size={isSmallScreen? 'sm' : 'md'} style={{display: 'flex'}}>
                                <Text  mr={8} miw={140} className={styles.subtitle}>Gross worldwide </Text>
                                {formatCurrency(movie?.revenue ? movie?.revenue : 0)}
                            </Text>
                            <Text size={isSmallScreen? 'sm' : 'md'} style={{display: 'flex'}}>
                                <Text  mr={8} miw={140} className={styles.subtitle}>Genres </Text>
                                {movie?.genres?.map(genre => genre.name).join(', ')}
                            </Text>
                        </Stack>
                    </Stack>
                </Flex>
                <Button variant="transparent" onClick={onModalOpen} p={0} ml={10} className={styles.RateButton} w='30%'>
                    <Image 
                        src={rating ? '/starFilled.svg' : '/StarEmpty.svg'} 
                        alt="give a rate" 
                        w={28} 
                        h={28} 
                        key='rateStar'
                    />
                    {rating ? <Text fw={600} c='black' ml={4}>{rating}</Text> : null}
                </Button>        
            </Flex>
            {movie?.videos?.results?.find((video: IVideo) => video.type === "Trailer")?.key ||
            movie?.overview || movie?.production_companies && movie?.production_companies?.length ?
                <Stack p={isSmallScreen ? 0 : 24} gap={0} className={styles.Wrapper}>
                    {movie?.videos?.results?.find((video: IVideo) => video.type === "Trailer")?.key ? 
                        <>
                            <Text size="xl" fw={700} mb={16}>Trailer</Text>
                            <AspectRatio ratio={16 / 9} w={500} mb={41}>
                                <iframe
                                    // eslint-disable-next-line max-len
                                    src={`https://www.youtube.com/embed/${movie.videos.results.find((video: IVideo) => video.type === "Trailer").key}`}
                                    title="YouTube video player"
                                    style={{ border: 0 }}
                                />
                            </AspectRatio>
                            {movie?.overview ? <div className={styles.divider}></div> : null}
                        </>
                        : null}
            
                    {movie?.overview ?  
                        <>
                            <Text size="xl" fw={700} mb={16}>Description</Text>
                            <Text size={isSmallScreen ? 'sm' : 'md'} mb={41}>{movie.overview}</Text>
                            {movie?.production_companies && movie?.production_companies?.length 
                                ? <div className={styles.divider}></div> : null}
                        </>
                        : null}

                    {movie?.production_companies && movie?.production_companies?.length ? 
                        <>
                            <Text size="xl" fw={700} mb={16}>Production</Text>
                            <Stack>
                                {movie.production_companies?.map(company => (
                                    <Flex key={company.id} align='center'>
                                        {company?.logo_path ? <Image 
                                            src={`https://image.tmdb.org/t/p/w500/${company?.logo_path}`} 
                                            w={40}
                                            h={40}
                                            alt="logo"
                                            mr={9}
                                            fit="contain"
                                        /> : null}
                                        <Text fw={700}>{company.name}</Text>
                                    </Flex>
                                ))}
                            </Stack>
                        </>
                        : null}
                </Stack>
                : null
            }
        </Stack>
    );
};

export default MovieDetails;