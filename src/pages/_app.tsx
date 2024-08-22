import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import {
  crukTheme,
  Fontface,
  GlobalStyleNoFontFace,
} from "@cruk/cruk-react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "../components/Layout";
import Head from "next/head";
import StyleSheetManager from "../contexts/StyleSheetManager";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={crukTheme}>
      <GlobalStyleNoFontFace />
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, height=device-height"
        />
        {/* This is way smaller than creating a styled component global style in _app */}
        <style>
          {`
            ${Fontface}
            a {
              text-decoration: none;
              color: black;
            }
            html {
                -webkit-scroll-padding-top: 4em;
                -moz-scroll-padding-top: 4em;
                -ms-scroll-padding-top: 4em;
                scroll-padding-top: 4em;
              }`}
        </style>
      </Head>
      <StyleSheetManager enableVendorPrefixes>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyleSheetManager>
    </ThemeProvider>
  </QueryClientProvider>
);

export default MyApp;
