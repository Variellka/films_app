import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.URL_FOR_GENRES!;

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
        try {
            const response = await axios.get(url);

            if (!response) {
                throw new Error();
            } 

            return response.data.genres;
        } catch (e) {
            return 'error' + e
        }
})