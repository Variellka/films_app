import { createSlice } from '@reduxjs/toolkit'
import { fetchRatedMovies } from '../services/fetchRatedMovies';

const initialState = {
    ids: undefined,
    movies: undefined,
    isLoading: true,
    error: undefined,
    totalPagesNum: 0,
    page: 1
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
