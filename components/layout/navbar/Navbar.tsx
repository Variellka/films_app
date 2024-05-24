import { AppShell, Button, Image, MantineProvider, Text, createTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Navbar.module.css';
import { routes } from "../../../app_/routes";

const theme = createTheme({
    components: {
      Button: Button.extend({
        classNames: styles,
      })
    },
  });

const Navbar = ({toggleMobile}) => {
    const {pathname} = useRouter();

    return (
        <MantineProvider theme={theme}>
            <AppShell.Navbar p={24} className={styles.Navbar}>
                <Image src={"/" + './Logo.svg'} alt="logo" h={36} w={179} fit="contain" mb={80}/>
                <Link href={routes.MOVIES}>
                    <Button 
                        variant={pathname.includes(routes.MOVIES) ? 'active' : 'subtle'} 
                        fullWidth 
                        justify="start"
                        onClick={toggleMobile}
                    >
                        <Text size="md">Movies</Text>
                    </Button>
                </Link>
                <Link href={routes.RATED_MOVIES}>
                    <Button 
                        variant={pathname === routes.RATED_MOVIES ? 'active' : 'subtle'} 
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