import { StateSchema } from "../app_/store";

export const getRateModalState = (state: StateSchema) => state.rateModal?.open;
export const getMovieDataForModal = (state: StateSchema) => state.rateModal?.movie;
