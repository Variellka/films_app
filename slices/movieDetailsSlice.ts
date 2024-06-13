import { createSlice } from '@reduxjs/toolkit'
import { fetchMovieDetails } from '../services/fetchMovieDetails';
import { IMovie } from '../utils/types';

export interface MovieDetailsSchema {
  data?: IMovie,
  id?: number,
  isLoading: boolean,
  error?: string,
}

const initialState: MovieDetailsSchema = {
    data: undefined,
    id: undefined,
    isLoading: true,
    error: undefined,
}

export const movieDetailsSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setID: (state, action) => {
            state.id = action.payload;
        },
        resetData: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                //@ts-ignore
                state.error = action.error;
                state.isLoading = false;
            });
    },
})

export const { actions: movieDetailsSliceActions } = movieDetailsSlice;
export const { reducer: movieDetailsSliceReducer } = movieDetailsSlice;
