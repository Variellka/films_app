import { StateSchema } from "../app_/store";

export const getRatedMoviesIds = (state: StateSchema) => state.ratedMovies?.ids || [];
export const getRatedMoviesData = (state: StateSchema) => state.ratedMovies?.movies;
export const getRatedMoviesFiltered = (state: StateSchema) => state.ratedMovies?.filteredMovies;
export const getRatedMoviesIsLoading = (state: StateSchema) => state.ratedMovies?.isLoading
export const getRatedMoviesTotalPages = (state: StateSchema) => state.ratedMovies?.totalPagesNum ;
export const getRatedMoviesPageNum = (state: StateSchema) => state.ratedMovies?.page || 1;
export const getRatedMoviesSearch = (state: StateSchema) => state.ratedMovies?.search;
