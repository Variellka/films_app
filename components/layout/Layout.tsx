import { Flex } from '@mantine/core';
import { FC, PropsWithChildren } from "react";
import Sidebar from "./sidebar/Sidebar";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <Flex>
           <Sidebar />
            <main>{children}</main>
         </Flex>
    );
};

export default Layout;