import { Grid, Image, Stack, Text } from "@mantine/core";
import Loader from "../Loader/Loader";
import MovieCardPreview from "../MovieCardPreview/MovieCardPreview";

const MoviesList = ({movies, isLoading}) => {
    if (movies && movies.length) {
        return (
            <Grid >
                {movies.map(movie => (
                    <Grid.Col key={movie.id} span={{ base: 12, md: 6}}>
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