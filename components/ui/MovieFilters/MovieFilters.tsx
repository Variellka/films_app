import { Flex, Select, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getGenresData } from "../../../selectors/getGenres";
import { getMoviesGenre, getMoviesReleaseYear } from "../../../selectors/getMovies";
import { useCallback } from "react";
import { AppDispatch } from "../../../app/store";
import { movieSliceActions } from "../../../slices/movieSlice";
import { fetchMovies } from "../../../services/fetchMovies";

const getYears = (startYear, endYear, fn = i => i) => {
    const length = endYear - startYear + 1;
    return Array.from({ length }, (_, i) => fn(startYear + i)).map(String);
};

const MovieFilters = () => {
    const genres = useSelector(getGenresData);
    const genresNames = genres.map(item => item.name)
    const currentGenre = useSelector(getMoviesGenre);
    const dispatch = useDispatch<AppDispatch>()
    const releaseDate = useSelector(getMoviesReleaseYear)

    const fetchData = useCallback(() => {
        dispatch(movieSliceActions.setPage(1));
        dispatch(fetchMovies());
    }, [dispatch]);

    const setGenre = useCallback((value) => {
        const genreId = genres.find(item => item.name === value);
        dispatch(movieSliceActions.setGenre(genreId))
        fetchData()
    }, [dispatch, fetchData, genres])

    const setReleaseYear = useCallback((value) => {
        dispatch(movieSliceActions.setReleaseYear(value))
        fetchData()
    }, [dispatch, fetchData])

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
                data={getYears(1895, 2024)}
                value={releaseDate}
                onChange={setReleaseYear}
                searchable
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