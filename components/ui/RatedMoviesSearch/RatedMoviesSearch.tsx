import { Button, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app_/store';
import { ratedMoviesSliceActions } from '../../../slices/ratedMoviesSlice';

const RatedMoviesSearch = () => {
    const [search, setSearch] = useState('');
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
    const dispatch = useDispatch<AppDispatch>()

    const onSearch = useCallback(() => {
        dispatch(ratedMoviesSliceActions.setSearch(search));
        dispatch(ratedMoviesSliceActions.setPage(1))
    }, [dispatch, search])

    return (
        <TextInput 
                h={48}
                pr={12}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                leftSection={icon}
                placeholder="Search movie title"
                rightSection={
                    <Button 
                        variant='filled' 
                        h={32} 
                        w={88}
                        onClick={onSearch}
                    >
                        Search
                    </Button>
                }
                rightSectionWidth={100}
                styles={{input: {height: '48px', border: 'none'}}}
                w='50%'
            />
    );
};

export default RatedMoviesSearch;