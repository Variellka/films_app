import { Button, Image, Stack, Text, Title } from '@mantine/core';
import Layout from '../../components/layout/Layout';

const RatedMoviesPage = ({movies = []}) => {
    return (
        <Layout>
            {movies.length ? 
                <Title order={1}>Rated Movies</Title>
                : 
                    <Stack justify='center' align='center' gap='16'>
                        <Image alt='no rated movies' src='/noRatedMovies.svg' w='311'/>
                        <Text size="md" fw={500}>You haven&apos;t rated any films yet</Text>
                        <Button variant='filled'>
                            <Text size="sm" fw={500}>Find movies</Text>
                        </Button>
                    </Stack>
            }
        </Layout>
    );
};

export default RatedMoviesPage;