import { Group, Pagination, Title } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import Layout from "../../components/layout/Layout";
import MovieFilters from "../../components/ui/MovieFilters/MovieFilters";
import MovieSort from "../../components/ui/MovieSort/MovieSort";
import MoviesList from "../../components/ui/MoviesList/MoviesList";
import { getMoviesData, getMoviesPageNum, getMoviesTotalPages } from "../../selectors/getMovies";
import { fetchGenres } from "../../services/fetchGenres";
import { fetchMovies } from "../../services/fetchMovies";
import { movieSliceActions } from "../../slices/movieSlice";

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const page = useSelector(getMoviesPageNum)
    const totalPages = useSelector(getMoviesTotalPages);
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
            {moviesLength &&  totalPages !== 1 ? 
            <Group justify="end" gap={24}>
              <Pagination 
                total={totalPages >= 500 ? 500 : totalPages} 
                onChange={setPage} 
                value={page}
                mt={24}
                color="grape"
              /> 
            </Group>
            : null}
        </Layout>
    );
};

export default MoviesPage;