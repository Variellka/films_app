import { createSlice } from '@reduxjs/toolkit'
import { fetchGenres } from '../services/fetchGenres';
import { IGenre } from '../utils/types';

export interface GenresSchema {
  data: IGenre[] | [],
  isLoading: boolean,
  error?: string,
}

const initialState: GenresSchema = {
    data: [],
    isLoading: false,
    error: undefined,
}

export const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload;
                state.isLoading = false;
            });
    },
})

export const { actions: genreSliceActions } = genreSlice;
export const { reducer: genreSliceReducer } = genreSlice;
