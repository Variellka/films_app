import { createSlice } from '@reduxjs/toolkit'
import { fetchMovies } from '../services/fetchMovies';
import { IGenre, IMovie } from '../utils/types';

export interface MoviesPageSchema {
    data: IMovie[],
    isLoading: boolean,
    error?: string,
    page: number,
    genres?: IGenre[],
    releaseYear?: string,
    sortBy: {
        name: string,
        value: string
    },
    ratingLowest?: string,
    ratingHighest?: string,
    totalPagesNum?: number
}

const initialState: MoviesPageSchema = {
    data: [],
    isLoading: true,
    error: undefined,
    page: 1,
    genres: undefined,
    releaseYear: undefined,
    sortBy: {
        name: 'Most popular',
        value: 'popularity.desc'
    },
    ratingLowest: undefined,
    ratingHighest: undefined,
    totalPagesNum: undefined
}

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setReleaseYear: (state, action) => {
            state.releaseYear = action.payload;
        },
        setSort: (state, action) => {
            state.sortBy = action.payload;
        },
        setRatingLowest: (state, action) => {
            state.ratingLowest = action.payload;
        },
        setRatingHighest: (state, action) => {
            state.ratingHighest = action.payload;
        },
        resetFilters:  (state) => {
            state.page = 1;
            state.genres = undefined;
            state.releaseYear = undefined;
            state.ratingLowest = undefined;
            state.ratingHighest = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.results;
                state.totalPagesNum = action.payload.total_pages
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                //@ts-ignore
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const { actions: movieSliceActions } = movieSlice;
export const { reducer: movieSliceReducer } = movieSlice;
