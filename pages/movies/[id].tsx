import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app_/store";
import Layout from "../../components/layout/Layout";
import MovieDetails from "../../components/ui/MovieDetails/MovieDetails";
import { fetchMovieDetails } from "../../services/fetchMovieDetails";
import { movieDetailsSliceActions } from "../../slices/movieDetailsSlice";

const MovieDetailsPage: NextPage = () => {
    const {query} = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (query.id) {
            dispatch(movieDetailsSliceActions.setID(query.id))
            dispatch(fetchMovieDetails())    
        }
        return () => {
            dispatch(movieDetailsSliceActions.resetData())
        }
    }, [dispatch, query.id])

    return (
        <Layout>
            <MovieDetails />
        </Layout> 
    );
};

export default MovieDetailsPage;