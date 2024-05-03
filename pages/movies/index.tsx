import { Pagination, Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import Layout from "../../components/layout/Layout";
import MoviesList from "../../components/ui/MoviesList/MoviesList";
import { fetchMovies } from "../../services/fetchMovies";
import MovieFilters from "../../components/ui/MovieFilters/MovieFilters";
import { fetchGenres } from "../../services/fetchGenres";
import { getMoviesPageNum, getMoviesTotalPages } from "../../selectors/getMovies";
import { movieSliceActions } from "../../slices/movieSlice";

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const page = useSelector(getMoviesPageNum)
    const totalPages = useSelector(getMoviesTotalPages)

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
            <Title order={1}>Movies</Title>
            <MovieFilters />
            <MoviesList/>
            <Pagination total={totalPages} onChange={setPage} value={page}/>
        </Layout>
    );
};

export default MoviesPage;