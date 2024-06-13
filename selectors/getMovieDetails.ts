import { StateSchema } from "../app_/store";

export const getMovieDetailsError = (state: StateSchema) => state.movieDetails?.error;
export const getMovieDetailsIsLoading = (state: StateSchema) => state.movieDetails?.isLoading;
export const getMovieDetailsData = (state: StateSchema) => state.movieDetails?.data;
export const getMovieDetailsId = (state: StateSchema) => state.movieDetails?.id;
 
