import { Button, Grid, Image, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../app_/routes';
import { AppDispatch } from '../../app_/store';
import Layout from '../../components/layout/Layout';
import { getRatedMoviesData, getRatedMoviesIds, getRatedMoviesIsLoading, getRatedMoviesPageNum, getRatedMoviesTotalPages } from '../../selectors/getRatedMovies';
import { fetchGenres } from '../../services/fetchGenres';
import { fetchRatedMovies } from '../../services/fetchRatedMovies';
import MovieCardPreview from '../../components/ui/MovieCardPreview/MovieCardPreview';
import Loader from '../../components/ui/Loader/Loader';
import { ratedMoviesSliceActions } from '../../slices/ratedMoviesSlice';
import { getRateModalState } from '../../selectors/getRateModal';
import MoviePagination from '../../components/ui/MoviePagination/MoviePagination';

const RatedMoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const ids = useSelector(getRatedMoviesIds)
    const ratedMovies = useSelector(getRatedMoviesData)
    const isLoading = useSelector(getRatedMoviesIsLoading)
    const modalState = useSelector(getRateModalState)
    const page = useSelector(getRatedMoviesPageNum)
    const totalPageNum = useSelector(getRatedMoviesTotalPages)

    const arraysEqual = (arr1, arr2) => {
        if (arr1?.length !== arr2?.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
 
    useEffect(() => {
        const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
        const movieIds = moviesRating.map(movie => movie.id);

        if (!arraysEqual(movieIds, ids) || !ratedMovies) {
            let moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
            const movieIds = moviesRating.map(movie => movie.id);
            dispatch(ratedMoviesSliceActions.setIds(movieIds))
            dispatch(fetchRatedMovies(movieIds))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, modalState])

    const setPage = useCallback((value) => {
        dispatch(ratedMoviesSliceActions.setPage(value))
      }, [dispatch])

    if (isLoading) {
        <Layout>
            <Loader />
        </Layout>
    }

    if (!ratedMovies?.length && !isLoading) {
        return (
            <Layout>
                <Stack justify='center' align='center' gap='16'>
                <Image alt='no rated movies' src='/noRatedMovies.svg' w='311'/>
                <Text size="md" fw={500}>You haven&apos;t rated any films yet</Text>
                <Link href={routes.MOVIES}>
                    <Button variant='filled'>
                        <Text size="sm" fw={500}>Find movies</Text>
                    </Button>
                </Link>    
            </Stack>
            </Layout>
            
        )
    }

    return (
        <Layout>
            <Title order={1}>Rated Movies</Title>
            <Grid >
            {ratedMovies?.slice((page - 1) * 4, (page - 1) * 4 + 4).map(movie => (
                <Grid.Col key={movie?.id} span={6}>
                    <MovieCardPreview movie={movie}/>
                </Grid.Col>      
            ))}
            </Grid>
            {ratedMovies && ratedMovies.length > 4 ?
              <MoviePagination 
                totalPages={totalPageNum} 
                setPage={setPage} 
                page={page} 
                justify={'center'}
              /> 
            : null}
        </Layout>
    );
};

export default RatedMoviesPage;