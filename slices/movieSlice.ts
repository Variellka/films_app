import { createSlice } from '@reduxjs/toolkit'
import { fetchMovies } from '../services/fetchMovies';

const initialState = {
  data: [],
  isLoading: true,
  error: undefined,
  page: 1,
  genre: undefined,
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
    setGenre: (state, action) => {
      state.genre = action.payload;
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
      state.genre = undefined;
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
          // @ts-ignore
            state.error = action.payload;
            state.isLoading = false;
        });
},
})

export const { actions: movieSliceActions } = movieSlice;
export const { reducer: movieSliceReducer } = movieSlice;
