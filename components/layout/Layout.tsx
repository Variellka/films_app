import { AppShell } from '@mantine/core';
import { FC, PropsWithChildren } from "react";
import Navbar from "./navbar/Navbar";
import RateMovieModal from '../ui/RateMovieModal/RateMovieModal';

const Layout:FC<PropsWithChildren> = ({children}) => {    
    return (
        <AppShell
            navbar={{
                width: 280,
                breakpoint: 'sm',
            }}
            withBorder={false}
        >
            <AppShell.Navbar p={24}>
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>
                <div style={{padding: '40px 90px'}}>
                    <RateMovieModal />
                    {children}
                </div>
            </AppShell.Main>
         </AppShell>
    );
};

export default Layout;