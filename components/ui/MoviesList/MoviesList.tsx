import { Grid } from "@mantine/core";
import MovieCardPreview from "../MovieCardPreview/MovieCardPreview";
import { useSelector } from "react-redux";
import { getMoviesData } from "../../../selectors/getMovies";

const MoviesList = () => {
    const movies = useSelector(getMoviesData)

    return (
        <Grid>
            {movies && movies.length ? 
            movies.map(movie => (
                <Grid.Col key={movie.id} span={6} p='24'>
                    <MovieCardPreview movie={movie}/>
                </Grid.Col>
            ))
            : null}
        </Grid>
    );
};

export default MoviesList;