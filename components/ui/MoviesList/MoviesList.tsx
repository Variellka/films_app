import { Grid, Image, Stack, Text } from "@mantine/core";
import Loader from "../Loader/Loader";
import MovieCardPreview from "../MovieCardPreview/MovieCardPreview";
import { useMediaQuery } from "@mantine/hooks";
import { IMovie } from "../../../utils/types";

interface MoviesListProps {
    movies?: IMovie[], 
    isLoading: boolean
}

const MoviesList = ({movies, isLoading}: MoviesListProps) => {
    const isSmallScreen = useMediaQuery('(max-width: 1090px)');

    if (movies && movies.length) {
        return (
            <Grid>
                {movies.map(movie => (
                    <Grid.Col key={movie.id} span={isSmallScreen ? 12 : 6}>
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
            <Image src='/noMovies.svg' alt='no movies found' maw='310'/>
            <Text size="xl" fw={600}>We don&apos;t have such movies, look for another one</Text>
        </Stack>
    );
};

export default MoviesList;