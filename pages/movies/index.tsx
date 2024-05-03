import { Pagination, Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Layout from "../../components/layout/Layout";
import MoviesList from "../../components/ui/MoviesList/MoviesList";
import { fetchMovies } from "../../services/fetchMovies";
import { fetchNextPageMovies } from "../../services/fetchNextPageMovies";
import MovieFilters from "../../components/ui/MovieFilters/MovieFilters";
import { fetchGenres } from "../../services/fetchGenres";

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(fetchMovies());
      dispatch(fetchGenres())
    }, [dispatch]); 

    const setPage = useCallback(() => {
      dispatch(fetchNextPageMovies())
    }, [dispatch])

    return (
        <Layout>
            <Title order={1}>Movies</Title>
            <MovieFilters />
            <MoviesList/>
            <Pagination total={10} onChange={setPage}/>
        </Layout>
    );
};

export default MoviesPage;