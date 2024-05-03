import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import './../styles/global.css'
import { Provider } from "react-redux";
import { store } from "../app/store";

export default function App({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
      <Head>
        <title>films app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
    </Provider>
  );
}
