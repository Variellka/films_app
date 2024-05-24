import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMoviesGenres, getMoviesPageNum, getMoviesRatingHighest, getMoviesRatingLowest, getMoviesReleaseYear, getMoviesSortBy } from "../selectors/getMovies";

const url = process.env.URL_FOR_MOVIES!;
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH_KEY
    }
  };

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, thunkApi) => {
        const { getState } = thunkApi;
        const page = getMoviesPageNum(getState()); 
        const genres = getMoviesGenres(getState());
        const releaseYear = getMoviesReleaseYear(getState());
        const sortBy = getMoviesSortBy(getState());
        const ratingLowest = getMoviesRatingLowest(getState());
        const ratingHighest = getMoviesRatingHighest(getState());

        try {
            const response = await axios.get(url, {...options, params: {
                language: 'en-US',
                with_genres: genres?.map(item => item.id).join(),
                primary_release_year: releaseYear,
                'vote_average.gte': ratingLowest,
                'vote_average.lte': ratingHighest,
                sort_by: sortBy.value,
                page
            }});

            if (!response) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return 'error' + e
        }
})