export const getRatedMoviesIds = (state) => state.ratedMovies?.ids;
export const getRatedMoviesData = (state) => state.ratedMovies?.movies;
export const getRatedMoviesIsLoading = (state) => state.ratedMovies?.isLoading
export const getRatedMoviesTotalPages = (state) => state.ratedMovies?.totalPagesNum ;
export const getRatedMoviesPageNum = (state) => state.ratedMovies?.page || 1;
