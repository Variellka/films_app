import { Button, MantineProvider, Stack, createTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './SideBar.module.css';

const links = {
    MOVIES: '/movies',
    RATED_MOVIES: '/rated-movies'
}

const theme = createTheme({
    components: {
      Button: Button.extend({
        classNames: styles,
      }),
    },
  });

const Sidebar = () => {
    const {pathname} = useRouter();

    return (
        <MantineProvider theme={theme}>
            <Stack className={styles.SideBar} justify="flex-start" gap="0">
                <Link href={links.MOVIES}>
                    <Button 
                        variant={pathname === links.MOVIES ? 'active' : 'subtle'} 
                        fullWidth 
                        justify="start"
                    >
                        Movies
                    </Button>
                </Link>
                <Link href={links.RATED_MOVIES}>
                    <Button 
                        variant={pathname === links.RATED_MOVIES ? 'active' : 'subtle'} 
                        fullWidth 
                        justify="start"
                    >
                        Rated Movies
                    </Button>
                </Link>
            </Stack>
        </MantineProvider>
    )
};

export default Sidebar;