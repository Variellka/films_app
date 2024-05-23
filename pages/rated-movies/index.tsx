import { Button, Flex, Image, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../app_/routes';
import { AppDispatch } from '../../app_/store';
import Layout from '../../components/layout/Layout';
import MoviePagination from '../../components/ui/MoviePagination/MoviePagination';
import RatedMoviesSearch from '../../components/ui/RatedMoviesSearch/RatedMoviesSearch';
import MoviesList from '../../components/ui/MoviesList/MoviesList';
import { getRateModalState } from '../../selectors/getRateModal';
import { getRatedMoviesData, getRatedMoviesFiltered, getRatedMoviesIds, getRatedMoviesIsLoading, getRatedMoviesPageNum, getRatedMoviesSearch, getRatedMoviesTotalPages } from '../../selectors/getRatedMovies';
import { fetchRatedMovies } from '../../services/fetchRatedMovies';
import { ratedMoviesSliceActions } from '../../slices/ratedMoviesSlice';
import { useMediaQuery } from '@mantine/hooks';

const RatedMoviesPage = () => {
    const isSmallScreen = useMediaQuery('(max-width: 1090px)');
    const dispatch = useDispatch<AppDispatch>()
    const ids = useSelector(getRatedMoviesIds)
    const ratedMovies = useSelector(getRatedMoviesData)
    const isLoading = useSelector(getRatedMoviesIsLoading)
    const modalState = useSelector(getRateModalState)
    const page = useSelector(getRatedMoviesPageNum)
    const totalPageNum = useSelector(getRatedMoviesTotalPages)
    const filteredMovies = useSelector(getRatedMoviesFiltered)
    const search = useSelector(getRatedMoviesSearch)
    const moviesToRender = search ? filteredMovies : ratedMovies

    useEffect(() => {
        const moviesRating = JSON.parse(localStorage.getItem("moviesRating") || '[]');
        const movieIds = moviesRating.map(movie => movie.id);

        if (movieIds?.toString() !== ids?.toString() || !ratedMovies) {
            dispatch(ratedMoviesSliceActions.setIds(movieIds))
            dispatch(fetchRatedMovies(movieIds))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, modalState])

    const setPage = useCallback((value) => {
        dispatch(ratedMoviesSliceActions.setPage(value))
      }, [dispatch])

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
            <Flex justify='space-between' mb={40} direction={isSmallScreen ? 'column' : 'row'}>
                <Title order={1}>Rated Movies</Title>
                <RatedMoviesSearch />
            </Flex>
            <MoviesList 
                movies={moviesToRender?.slice((page - 1) * 4, (page - 1) * 4 + 4)} 
                isLoading={isLoading}
            />
            {moviesToRender && moviesToRender.length > 4 ?
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