import { Button, Flex, MultiSelect, Select } from "@mantine/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app_/store";
import { getGenresData } from "../../../selectors/getGenres";
import { getMoviesGenres, getMoviesRatingHighest, getMoviesRatingLowest, getMoviesReleaseYear } from "../../../selectors/getMovies";
import { fetchMovies } from "../../../services/fetchMovies";
import { movieSliceActions } from "../../../slices/movieSlice";
import { useMediaQuery } from "@mantine/hooks";

const getYears = (startYear, endYear, fn = i => i) => {
    const length = endYear - startYear + 1;
    return Array.from({ length }, (_, i) => fn(startYear + i)).map(String);
};

const MovieFilters = () => {
    const dispatch = useDispatch<AppDispatch>()
    const genres = useSelector(getGenresData);
    const genresNames = genres.map(item => item.name)
    const currentGenres = useSelector(getMoviesGenres);
    const releaseDate = useSelector(getMoviesReleaseYear)
    const ratingLowest = useSelector(getMoviesRatingLowest);
    const ratingHighest = useSelector(getMoviesRatingHighest)
    const isSmallScreen = useMediaQuery('(max-width: 1090px)');

    const fetchData = useCallback(() => {
        dispatch(movieSliceActions.setPage(1));
        dispatch(fetchMovies());
    }, [dispatch]);

    const setGenre = useCallback((selectedGenres) => {
        const lookup = genres.reduce((acc, item) => {
        acc[item.name] = item.id;
            return acc;
        }, {});

        const resultArray = selectedGenres.map(name => ({
            name: name,
            id: lookup[name]
        }));
        dispatch(movieSliceActions.setGenres(resultArray))
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
        <Flex justify="space-between"  mb='24' direction={isSmallScreen ? 'column' : 'row'} gap="xs">
            <MultiSelect
                label="Genres"
                placeholder="Select genre"
                data={genresNames}
                value={currentGenres?.map(genre => genre.name)}
                onChange={setGenre}
                key={currentGenres?.map(genre => genre.name)}
                w={isSmallScreen ? '100%' : '28%'}
            />
            <Select
                label="Release year"
                placeholder="Select release year"
                data={getYears(1895, 2024)}
                value={releaseDate}
                onChange={setReleaseYear}
                searchable
                key={releaseDate}
                w={isSmallScreen ? '100%' : '28%'}
            />
            <Flex 
                gap={8}  
                direction={isSmallScreen ? 'column' : 'row'}                 
                w={isSmallScreen ? '100%' : '28%'}
            >
                <Select
                    label="Ratings"
                    placeholder="From"
                    data={Array.from({ length: 10 }, (_, i) => i+1).map(String)}
                    onChange={setRatingLowest}
                    value={ratingLowest}
                    key={ratingLowest}
                />
                <Select
                    label={isSmallScreen ? '' : " "}
                    placeholder="To"
                    data={Array.from({ length: 10 }, (_, i) => i+1).map(String)}
                    onChange={setRatingHighest}
                    value={ratingHighest}
                    key={ratingHighest}
                />               
            </Flex>
            <Flex align='flex-end' justify={isSmallScreen ? 'flex-end' : 'normal'}>
                <Button variant="white" color="gray" onClick={resetFilters} >
                    <span style={{whiteSpace: 'normal'}}>Reset filters</span>
                </Button>
            </Flex>
        </Flex>
    );
};

export default MovieFilters;