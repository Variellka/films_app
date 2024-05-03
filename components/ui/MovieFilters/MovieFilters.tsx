import { Flex, Select, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getGenresData } from "../../../selectors/getGenres";
import { getMoviesGenre } from "../../../selectors/getMovies";
import { useCallback } from "react";
import { AppDispatch } from "../../../app/store";
import { movieSliceActions } from "../../../slices/movieSlice";
import { fetchMovies } from "../../../services/fetchMovies";

const MovieFilters = () => {
    const genres = useSelector(getGenresData);
    const genresNames = genres.map(item => item.name)
    const currentGenre = useSelector(getMoviesGenre);
    const dispatch = useDispatch<AppDispatch>()

    const fetchData = useCallback(() => {
        dispatch(movieSliceActions.setPage(1));
        dispatch(fetchMovies());
    }, [dispatch]);


    const setGenre = useCallback((value) => {
        const genreId = genres.find(item => item.name === value);
        dispatch(movieSliceActions.setGenre(genreId))
        fetchData()
    }, [dispatch, fetchData, genres])

    return (
        <Flex>
            <Select
                label="Genres"
                placeholder="Select genre"
                data={genresNames}
                value={currentGenre?.name}
                onChange={setGenre}
            />
            <Select
                label="Release year"
                placeholder="Select release year"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Select
                label="Ratings"
                placeholder="From"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Select
                label=""
                placeholder="To"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Text>Reset filters</Text>
        </Flex>
    );
};

export default MovieFilters;