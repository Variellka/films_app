import { configureStore } from '@reduxjs/toolkit'
import { movieSliceReducer } from '../slices/movieSlice'
import { genreSliceReducer } from '../slices/genreSlice';
import { movieDetailsSliceReducer } from '../slices/movieDetailsSlice';
import { rateModalSliceReducer } from '../slices/rateModalSlice';
import { ratedMoviesSliceReducer } from '../slices/ratedMoviesSlice';

export const store = configureStore({
    reducer: {
        movies: movieSliceReducer,
        genres: genreSliceReducer,
        movieDetails: movieDetailsSliceReducer,
        rateModal: rateModalSliceReducer,
        ratedMovies: ratedMoviesSliceReducer
    }, 
})

export type AppDispatch = typeof store.dispatch;