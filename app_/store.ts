import { configureStore } from '@reduxjs/toolkit'
import { movieSliceReducer } from '../slices/movieSlice'
import { genreSliceReducer } from '../slices/genreSlice';
import { movieDetailsSliceReducer } from '../slices/movieDetailsSlice';

export const store = configureStore({
    reducer: {
        movies: movieSliceReducer,
        genres: genreSliceReducer,
        movieDetails: movieDetailsSliceReducer
    }, 
})

export type AppDispatch = typeof store.dispatch;