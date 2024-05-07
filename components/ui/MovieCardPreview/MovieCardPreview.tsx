import { Flex, Image, Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { getGenresData } from "../../../selectors/getGenres";

const MovieCardPreview = ({movie}) => {
    const genres = useSelector(getGenresData);
    const genresDecoded = genres 
    ? movie.genre_ids.map(id => genres.find(obj => obj.id === id)?.name).join(', ') 
    : null;

    return (
        <Flex gap={16}>
            <Image 
                alt={movie.original_title} 
                src={movie.poster_path ? 
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                    : '/noPoster.png'} 
                h={170}
                w={119}
            />
            <Stack align="stretch" justify="space-between">
                <Stack gap='xs'>
                    <Text size="xl" fw={500}>{movie.original_title}</Text>
                    <Text size="md">{movie.release_date.split('-')[0]}</Text>
                    <Text size="md" fw={600}>
                        {movie.vote_average.toFixed(1)}
                        <Text span fw={400}>{` (${movie.vote_count})`}</Text>
                    </Text>
                </Stack>
                <Text><Text span>Genres </Text>{genresDecoded}</Text>
            </Stack>
        </Flex>
    );
};

export default MovieCardPreview;