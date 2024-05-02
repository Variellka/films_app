import { AppShell, Button, MantineProvider, Text, createTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Navbar.module.css';

const links = {
    MOVIES: '/movies',
    RATED_MOVIES: '/rated-movies'
}

const theme = createTheme({
    components: {
      Button: Button.extend({
        classNames: styles,
      })
    },
  });

const Navbar = () => {
    const {pathname} = useRouter();

    return (
        <MantineProvider theme={theme}>
            <AppShell.Navbar p="md" className={styles.Navbar}>
                <Link href={links.MOVIES}>
                    <Button 
                        variant={pathname === links.MOVIES ? 'active' : 'subtle'} 
                        fullWidth 
                        justify="start"
                    >
                        <Text size="md">Movies</Text>
                    </Button>
                </Link>
                <Link href={links.RATED_MOVIES}>
                    <Button 
                        variant={pathname === links.RATED_MOVIES ? 'active' : 'subtle'} 
                        fullWidth 
                        justify="start"
                    >
                        <Text size="md">Rated Movies</Text>
                    </Button>
                </Link>
            </AppShell.Navbar>
        </MantineProvider>
    )
};

export default Navbar;