import { Button, Flex, Modal, Rating, Stack, Text } from '@mantine/core';

const RateMovieModal = ({movie, opened, close}) => {
    return (
        <Modal 
            opened={opened} 
            onClose={close} 
            title="Your rating" 
            centered
            size="auto"
        >
            <Stack>
                <Text fw={700}>{movie?.original_title}</Text>
                <Rating defaultValue={0} count={10} size="xl"/>
                <Flex >
                    <Button variant='filled'>Save</Button>
                    <Button variant='transparent'>Remove rating</Button>
                </Flex>
            </Stack>
        </Modal>
    );
};

export default RateMovieModal;