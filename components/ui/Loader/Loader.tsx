import { Box, LoadingOverlay } from "@mantine/core";

interface LoaderProps {
    isLoading: boolean
}

const Loader = ({isLoading}: LoaderProps) => {
    return (
        <Box pos="relative">
            <LoadingOverlay 
                visible={isLoading} 
                zIndex={1000} 
                overlayProps={{ radius: "sm", blur: 2 }} 
                loaderProps={{ color: 'black', type: 'bars' }}
                h={100}
            />
        </Box>
    );
};

export default Loader;