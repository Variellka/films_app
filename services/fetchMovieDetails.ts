import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMovieDetailsId } from "../selectors/getMovieDetails";
import { IMovie } from "../utils/types";
import { ThunkConfig } from "../app_/store";

const url = process.env.URL_FOR_MOVIE_DETAILS!;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH_KEY
    }
};

export const fetchMovieDetails = createAsyncThunk<IMovie, void, ThunkConfig>('movieDetails/fetchMovieDetails', 
    async (_, thunkApi) => {
        const { getState } = thunkApi;
        const id = getMovieDetailsId(getState()); 

        if (id) {
            try {
                const response = await axios.get(`${url}/${id}`, {...options, params: {
                    language: 'en-US',
                    ['append_to_response']: 'videos'
                }});

                if (!response) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                throw new Error();
            }
        }
    })