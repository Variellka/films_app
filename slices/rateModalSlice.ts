import { createSlice } from '@reduxjs/toolkit'
import { IMovie } from '../utils/types';

export interface RateModalSchema {
  open: boolean,
  movie?: IMovie
}

const initialState: RateModalSchema = {
    open: false,
    movie: undefined
}

export const rateModalSlice = createSlice({
    name: 'rateModal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.open = action.payload;
        },
        setMovieData: (state, action) => {
            state.movie = action.payload;
        },
    }
})

export const { actions: rateModalSliceActions } = rateModalSlice;
export const { reducer: rateModalSliceReducer } = rateModalSlice;
