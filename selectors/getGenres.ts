import { StateSchema } from "../app_/store";

export const getGenresError = (state: StateSchema) => state.genres?.error;
export const getGenresIsLoading = (state: StateSchema) => state.genres?.isLoading;
export const getGenresData = (state: StateSchema) => state.genres?.data;
