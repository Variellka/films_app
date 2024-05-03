import { createSlice } from '@reduxjs/toolkit'
import { fetchMovies } from '../services/fetchMovies';

const initialState = {
  data: [],
  isLoading: false,
  error: undefined,
  page: 1,
  genre: undefined,
  releaseYear: undefined,
  sortBy: undefined,
  rating: undefined
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
      state.page = action.payload;
    },
    setRating: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchMovies.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
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
