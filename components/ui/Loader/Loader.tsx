import { Box, LoadingOverlay } from "@mantine/core";

const Loader = (isLoading) => {
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