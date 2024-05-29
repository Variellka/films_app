import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.URL_FOR_MOVIE_DETAILS!;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH_KEY
    }
};

export const fetchRatedMovies = createAsyncThunk<any, string[]>('ratedMovies/fetchRatedMovies', 
    async (ids) => {
        if (ids && ids.length) {
            const fetchMovieDetail = async (id: string) => {
                const response =  await axios.get(`${url}/${id}`, {...options, params: {
                    language: 'en-US',
                }});            
                if (!response) {
                    throw new Error(`Error fetching movie with id ${id}`);
                }
                return response.data;
            };

            const promises = ids.map(id => fetchMovieDetail(id));

            try {
                return await Promise.all(promises);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                throw error;
            }
        }
    })