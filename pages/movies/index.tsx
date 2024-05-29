import { Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app_/store";
import Layout from "../../components/layout/Layout";
import MovieFilters from "../../components/ui/MovieFilters/MovieFilters";
import MoviePagination from "../../components/ui/MoviePagination/MoviePagination";
import MovieSort from "../../components/ui/MovieSort/MovieSort";
import MoviesList from "../../components/ui/MoviesList/MoviesList";
import { getMoviesData, getMoviesIsLoading, getMoviesPageNum, getMoviesTotalPages } from "../../selectors/getMovies";
import { fetchGenres } from "../../services/fetchGenres";
import { fetchMovies } from "../../services/fetchMovies";
import { movieSliceActions } from "../../slices/movieSlice";

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const page = useSelector(getMoviesPageNum)
    const totalPages = useSelector(getMoviesTotalPages);
    const moviesData = useSelector(getMoviesData);
    const moviesIsLoading = useSelector(getMoviesIsLoading)

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchGenres())
    }, [dispatch]); 

    const setPage = useCallback((value: number) => {
        dispatch(movieSliceActions.setPage(value))
        dispatch(fetchMovies())
    }, [dispatch])

    return (
        <Layout>
            <Title order={1} mb='40'>Movies</Title>
            <MovieFilters />
            <MovieSort />
            <MoviesList movies={moviesData} isLoading={moviesIsLoading}/>
            {moviesData?.length &&  totalPages !== 1 ?
                <MoviePagination 
                    totalPages={totalPages} 
                    setPage={setPage} 
                    page={page} 
                    justify={'end'}
                /> 
                : null}
        </Layout>
    );
};

export default MoviesPage;