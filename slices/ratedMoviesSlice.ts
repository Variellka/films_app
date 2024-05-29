import { createSlice, current } from '@reduxjs/toolkit'
import { fetchRatedMovies } from '../services/fetchRatedMovies';
import { IMovie } from '../utils/types';

export interface RatedMoviesPageSchema {
  ids?: undefined,
  movies?: IMovie[],
  filteredMovies?: IMovie[],
  isLoading: boolean,
  error?: string,
  totalPagesNum: number,
  page: number,
  search: string,
}

const initialState: RatedMoviesPageSchema = {
    ids: undefined,
    movies: undefined,
    filteredMovies: undefined,
    isLoading: true,
    error: undefined,
    totalPagesNum: 0,
    page: 1,
    search: '',
}

export const ratedMoviesSlice = createSlice({
    name: 'ratedMovies',
    initialState,
    reducers: {
        setIds: (state, action) => {
            state.ids = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            // @ts-ignore
            state.filteredMovies = current(state).movies.filter(item => 
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRatedMovies.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRatedMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
                if (action.payload) {
                    state.totalPagesNum = Math.ceil(action.payload.length / 4);
                }
            })
            .addCase(fetchRatedMovies.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const { actions: ratedMoviesSliceActions } = ratedMoviesSlice;
export const { reducer: ratedMoviesSliceReducer } = ratedMoviesSlice;
