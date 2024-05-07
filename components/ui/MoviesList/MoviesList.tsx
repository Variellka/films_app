import { Grid, Image, Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { getMoviesData, getMoviesIsLoading } from "../../../selectors/getMovies";
import Loader from "../Loader/Loader";
import MovieCardPreview from "../MovieCardPreview/MovieCardPreview";

const MoviesList = () => {
    const movies = useSelector(getMoviesData)
    const isLoading = useSelector(getMoviesIsLoading)

    if (movies && movies.length) {
        return (
            <Grid >
                {movies.map(movie => (
                    <Grid.Col key={movie.id} span={6} p='24'>
                        <MovieCardPreview movie={movie}/>
                    </Grid.Col>
                ))}
            </Grid>
        )
    }

    if (isLoading) {
        return (
            <Loader isLoading={isLoading}/>
        )
    }

    return (
        <Stack align="center" justify="center" gap={16}>
            <Image src='/noMovies.svg' alt='no movies found' w='310'/>
            <Text size="xl" fw={600}>We don&apos;t have such movies, look for another one</Text>
        </Stack>
    );
};

export default MoviesList;