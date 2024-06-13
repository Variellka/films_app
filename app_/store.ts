import { configureStore } from '@reduxjs/toolkit'
import { MoviesPageSchema, movieSliceReducer } from '../slices/movieSlice'
import { GenresSchema, genreSliceReducer } from '../slices/genreSlice';
import { MovieDetailsSchema, movieDetailsSliceReducer } from '../slices/movieDetailsSlice';
import { RateModalSchema, rateModalSliceReducer } from '../slices/rateModalSlice';
import { RatedMoviesPageSchema, ratedMoviesSliceReducer } from '../slices/ratedMoviesSlice';

export const store = configureStore({
    reducer: {
        movies: movieSliceReducer,
        genres: genreSliceReducer,
        movieDetails: movieDetailsSliceReducer,
        rateModal: rateModalSliceReducer,
        ratedMovies: ratedMoviesSliceReducer
    }, 
})

export interface StateSchema {
    movies: MoviesPageSchema,
    genres: GenresSchema,
    movieDetails: MovieDetailsSchema,
    rateModal: RateModalSchema,
    ratedMovies: RatedMoviesPageSchema
}

export interface ThunkConfig {
    state: StateSchema
}

export type AppDispatch = typeof store.dispatch;