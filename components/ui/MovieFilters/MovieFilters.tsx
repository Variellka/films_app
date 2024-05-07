import { Button, Flex, Select, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getGenresData } from "../../../selectors/getGenres";
import { getMoviesGenre, getMoviesRatingHighest, getMoviesRatingLowest, getMoviesReleaseYear } from "../../../selectors/getMovies";
import { useCallback } from "react";
import { AppDispatch } from "../../../app/store";
import { movieSliceActions } from "../../../slices/movieSlice";
import { fetchMovies } from "../../../services/fetchMovies";

const getYears = (startYear, endYear, fn = i => i) => {
    const length = endYear - startYear + 1;
    return Array.from({ length }, (_, i) => fn(startYear + i)).map(String);
};

const MovieFilters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const genres = useSelector(getGenresData);
    const genresNames = genres.map(item => item.name)
    const currentGenre = useSelector(getMoviesGenre);
    const releaseDate = useSelector(getMoviesReleaseYear)
    const ratingLowest = useSelector(getMoviesRatingLowest);
    const ratingHighest = useSelector(getMoviesRatingHighest)

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

    const setRatingLowest = useCallback((value) => {
        dispatch(movieSliceActions.setRatingLowest(value))
        fetchData()
    }, [dispatch, fetchData])

    const setRatingHighest = useCallback((value) => {
        dispatch(movieSliceActions.setRatingHighest(value))
        fetchData()
    }, [dispatch, fetchData])

    const resetFilters = useCallback(() => {
        dispatch(movieSliceActions.resetFilters());
        fetchData()
    }, [dispatch, fetchData])

    return (
        <Flex justify="space-between"  mb='24'>
            <Select
                label="Genres"
                placeholder="Select genre"
                data={genresNames}
                value={currentGenre?.name}
                onChange={setGenre}
                key={currentGenre?.name}
            />
            <Select
                label="Release year"
                placeholder="Select release year"
                data={getYears(1895, 2024)}
                value={releaseDate}
                onChange={setReleaseYear}
                searchable
                key={releaseDate}
            />
            <Flex gap={8}>
                <Select
                    label="Ratings"
                    placeholder="From"
                    data={Array.from({ length: 10 }, (_, i) => i+1).map(String)}
                    onChange={setRatingLowest}
                    value={ratingLowest}
                    key={ratingLowest}
                />
                <Flex align="flex-end">
                    <Select
                        label=""
                        placeholder="To"
                        data={Array.from({ length: 10 }, (_, i) => i+1).map(String)}
                        onChange={setRatingHighest}
                        value={ratingHighest}
                        key={ratingHighest}
                    />
                    <Button variant="white" color="gray" onClick={resetFilters}>
                        Reset filters
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default MovieFilters;