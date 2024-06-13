import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren } from "react";
import RateMovieModal from '../ui/RateMovieModal/RateMovieModal';
import styles from './Layout.module.css';
import Navbar from "./navbar/Navbar";

const Layout:FC<PropsWithChildren> = ({children}) => {  
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

    return (
        <AppShell
            navbar={{
                width: 280,
                breakpoint: 'md',
                collapsed: { mobile: !mobileOpened }
            }}
            withBorder={false}
        >
            <AppShell.Header w={20}>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="md" size="sm" />
            </AppShell.Header>
            <AppShell.Navbar p={24} >
                <Navbar toggleMobile={toggleMobile}/>
            </AppShell.Navbar>
            <AppShell.Main>
                <div className={styles.Layout}>
                    <RateMovieModal />
                    {children}
                </div>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;