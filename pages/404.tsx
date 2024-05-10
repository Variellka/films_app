import { Button, Flex, Image, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { routes } from '../app_/routes';

const NotFoundPage = () => {
    return (
        <Flex>
            <Image src='./Logo.svg' alt="logo" h={36} w={135} fit="contain" m={24}/>
            <Stack align='center' style={{position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Image src='./notFound.svg' alt='page not found'/>
                <Text fw={700}>We can&apos;t find the page you are looking for</Text>
                <Link href={routes.MOVIES}>
                    <Button variant='filled'>
                        <Text size="sm" fw={500}>Go Home</Text>
                    </Button>
                </Link>
            </Stack>
        </Flex>
    );
};

export default NotFoundPage; 