import { Button, createTheme } from "@mantine/core";
import styles from './styles/Global.module.css'

export const theme = createTheme({
    components: {
        Button: Button.extend({
            classNames: styles,
        })
    },
});
