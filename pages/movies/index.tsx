import { Pagination, Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import Layout from "../../components/layout/Layout";
import MoviesList from "../../components/ui/MoviesList/MoviesList";
import { fetchMovies } from "../../services/fetchMovies";
import MovieFilters from "../../components/ui/MovieFilters/MovieFilters";
import { fetchGenres } from "../../services/fetchGenres";
import { getMoviesData, getMoviesPageNum, getMoviesTotalPages } from "../../selectors/getMovies";
import { movieSliceActions } from "../../slices/movieSlice";
import MovieSort from "../../components/ui/MovieSort/MovieSort";

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const page = useSelector(getMoviesPageNum)
    const totalPages = useSelector(getMoviesTotalPages)
    const moviesLength = useSelector(getMoviesData).length

    useEffect(() => {
      dispatch(fetchMovies());
      dispatch(fetchGenres())
    }, [dispatch]); 

    const setPage = useCallback((value) => {
      dispatch(movieSliceActions.setPage(value))
      dispatch(fetchMovies())
    }, [dispatch])

    return (
        <Layout>
            <Title order={1} mb='40'>Movies</Title>
            <MovieFilters />
            <MovieSort />
            <MoviesList/>
            {moviesLength ? <Pagination total={totalPages} onChange={setPage} value={page}/> : null}
        </Layout>
    );
};

export default MoviesPage;