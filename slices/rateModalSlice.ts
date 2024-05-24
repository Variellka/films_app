import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
