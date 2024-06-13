import { StateSchema } from "../app_/store";

export const getMoviesError = (state: StateSchema) => state.movies?.error;
export const getMoviesIsLoading = (state: StateSchema) => state.movies?.isLoading;
export const getMoviesData = (state: StateSchema) => state.movies?.data;
export const getMoviesPageNum = (state: StateSchema) => state.movies?.page || 1;
export const getMoviesGenres = (state: StateSchema) => state.movies?.genres || undefined;
export const getMoviesReleaseYear = (state: StateSchema) => state.movies?.releaseYear  || undefined;
export const getMoviesSortBy = (state: StateSchema) => state.movies?.sortBy;
export const getMoviesRatingLowest = (state: StateSchema) => state.movies?.ratingLowest || undefined;
export const getMoviesRatingHighest = (state: StateSchema) => state.movies?.ratingHighest || undefined;
export const getMoviesTotalPages = (state: StateSchema) => state.movies?.totalPagesNum || 0;