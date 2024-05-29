import { Group, Pagination } from "@mantine/core";

interface MoviePaginationProps {
    totalPages: number,
    setPage: (arg: number) => void,
    page: number,
    justify: string
}

const MoviePagination = ({totalPages, setPage, page, justify}: MoviePaginationProps) => {
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