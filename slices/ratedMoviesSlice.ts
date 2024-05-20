import { createSlice } from '@reduxjs/toolkit'
import { fetchRatedMovies } from '../services/fetchRatedMovies';

const initialState = {
    ids: undefined,
    movies: undefined,
    isLoading: true,
    error: undefined
}

export const ratedMoviesSlice = createSlice({
  name: 'ratedMovies',
  initialState,
  reducers: {
    setIds: (state, action) => {
        state.ids = action.payload;
    },
    setMovies: (state, action) => {
        state.movies = action.payload;
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
