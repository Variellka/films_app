import { configureStore } from '@reduxjs/toolkit'
import { movieSliceReducer } from '../slices/movieSlice'
import { genreSliceReducer } from '../slices/genreSlice';

export const store = configureStore({
    reducer: {
        movies: movieSliceReducer,
        genres: genreSliceReducer
    }, 
})

export type AppDispatch = typeof store.dispatch;