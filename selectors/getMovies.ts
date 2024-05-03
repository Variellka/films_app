export const getMoviesError = (state) => state.movies?.error;
export const getMoviesIsLoading = (state) => state.movies?.isLoading;
export const getMoviesData = (state) => state.movies?.data;
export const getMoviesPageNum = (state) => state.movies?.page || 1;
export const getMoviesGenre = (state) => state.movies?.genre || undefined;
export const getMoviesReleaseYear = (state) => state.movies?.releaseYear  || undefined;
export const getMoviesSortBy = (state) => state.movies?.sortBy  || undefined;
export const getMoviesRating = (state) => state.movies?.rating || undefined;