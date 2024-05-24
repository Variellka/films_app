import { Group, Pagination } from "@mantine/core";

const MoviePagination = ({totalPages, setPage, page, justify}) => {
    return (
        <Group justify={justify} gap={24}>
            <Pagination 
                total={totalPages >= 500 ? 500 : totalPages} 
                onChange={setPage} 
                value={page}
                mt={24}
                color="#9854F6"
            /> 
        </Group>
    );
};

export default MoviePagination;