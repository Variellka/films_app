import { Button, createTheme } from "@mantine/core";
import styles from './styles/Buttons.module.css'

export const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: styles,
    })
  },
});
