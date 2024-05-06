import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMoviesGenre, getMoviesPageNum, getMoviesRating, getMoviesReleaseYear, getMoviesSortBy } from "../selectors/getMovies";

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
        const genre = getMoviesGenre(getState());
        const releaseYear = getMoviesReleaseYear(getState());
        const sortBy = getMoviesSortBy(getState());
        const rating = getMoviesRating(getState());

        try {
            const response = await axios.get(url, {...options, params: {
                language: 'en-US',
                with_genres: genre?.id,
                primary_release_year: releaseYear,
                'vote_average.lte': rating ? rating.lte : undefined,
                'vote_average.gte': rating ? rating.gte : undefined,
                sort_by: sortBy,
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