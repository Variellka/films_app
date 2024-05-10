import { Flex, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesSortBy } from "../../../selectors/getMovies";
import { useCallback } from "react";
import { AppDispatch } from "../../../app_/store";
import { movieSliceActions } from "../../../slices/movieSlice";
import { fetchMovies } from "../../../services/fetchMovies";

const movieSortOptions = [
    {
        name: 'Most popular',
        value: 'popularity.desc'
    },
    {
        name: 'Least popular',
        value: 'popularity.asc'
    },
    {
        name: 'Most rated',
        value: 'vote_average.desc'
    },
    {
        name: 'Least rated',
        value: 'vote_average.asc'
    },
    {
        name: 'Most voted',
        value: 'vote_count.desc'
    },
    {
        name: 'Least voted',
        value: 'vote_count.asc'
    },
] 

const MovieSort = () => {
    const sortOption = useSelector(getMoviesSortBy);
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = useCallback(() => {
        dispatch(movieSliceActions.setPage(1));
        dispatch(fetchMovies());
    }, [dispatch]);

    const setSortOption = useCallback((value) => {
        const newOption = movieSortOptions.find(option => option.name === value)
        dispatch(movieSliceActions.setSort(newOption));
        fetchData();
    }, [dispatch, fetchData])

    return (
        <Flex justify="flex-end" mb='24'>
            <Select
                label="Sort by"
                placeholder="From"
                data={movieSortOptions.map(sort => sort.name)}
                onChange={setSortOption}
                value={sortOption.name}
                key={sortOption.name}
            />
        </Flex>
    );
};

export default MovieSort;