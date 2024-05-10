import { Flex, Image, Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { getGenresData } from "../../../selectors/getGenres";
import styles from './MovieCardPreview.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import { formatVote } from "../../../utils/formatFunctions";

const MovieCardPreview = ({movie}) => {
    const {pathname} = useRouter();
    const genres = useSelector(getGenresData);
    const genresDecoded = genres 
    ? movie.genre_ids.map(id => genres.find(obj => obj.id === id)?.name).join(', ') 
    : null;

    return (
        <Flex justify='space-between'>
            <Flex gap={16}>
                <Image 
                    alt={movie?.original_title} 
                    src={movie?.poster_path ? 
                        `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` 
                        : '/noPoster.png'} 
                    h={170}
                    w={119}
                />
                <Stack align="stretch" justify="space-between">
                    <Stack gap={8}>
                        <Link href={`${pathname}/${movie.id}`} className={styles.MovieTitle}>
                        <Text 
                            size="xl" 
                            fw={500} 
                            
                        >
                            {movie?.original_title}
                        </Text>
                        </Link>
                        
                        <Text size="md" className={styles.MovieDate}>{movie?.release_date.split('-')[0]}</Text>
                        <Flex>
                            <Image src='/Star.svg' alt="rating" w={28} h={28} mr={4}/>
                            <Text size="md" fw={600}>{movie?.vote_average.toFixed(1)}
                                <Text span fw={400} className={styles.MovieVote}>{` (${formatVote(movie?.vote_count)})`}</Text>
                            </Text>
                        </Flex>
                    </Stack>
                    <Text>
                        <Text span mr={8} className={styles.MovieGenre}>Genres</Text>
                        {genresDecoded}
                    </Text>
                </Stack>
            </Flex>
            <Image src='/StarEmpty.svg' alt="give a rate" w={28} h={28}/>
        </Flex>
    );
};

export default MovieCardPreview;