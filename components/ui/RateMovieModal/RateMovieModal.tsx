import { Modal, Text } from '@mantine/core';

const RateMovieModal = ({movie, opened, close}) => {
    return (
        <Modal opened={opened} onClose={close} title="Your rating" centered>
            <Text>{movie?.original_title}</Text>
        </Modal>
    );
};

export default RateMovieModal;