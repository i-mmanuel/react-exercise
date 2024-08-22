import { ReactNode } from "react";
import Head from "next/head";
import styled from "styled-components";
import {
  Box,
  Footer,
  Link,
  Header,
  ThemeType,
} from "@cruk/cruk-react-components";

// makes sure footer stays near the bottom of the screen
const PageContentWrapper = styled.div<{ theme: ThemeType }>`
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoint.desktopLarge};
  padding: 0 ${({ theme }) => theme.spacing.s};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textDark};
`;

const ContentWrapperResponsive = styled(Box)<{ theme: ThemeType }>`
  && {
    max-width: ${({ theme }) => theme.utilities.contentMaxWidth};
    margin: 0 auto;
    padding: 0;
  }
`;

const FooterWrapper = styled.div<{ theme: ThemeType }>`
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
  clear: both;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <PageContentWrapper id="main">
        <ContentWrapperResponsive
          backgroundColor="backgroundLight"
          paddingBottom="l"
          paddingTop="s"
        >
          {children}
        </ContentWrapperResponsive>
      </PageContentWrapper>
      <FooterWrapper>
        <Footer>
          <Link
            appearance="secondary"
            href="https://www.cancerresearchuk.org/about-us/contact-us"
          >
            Contact us
          </Link>
        </Footer>
      </FooterWrapper>
    </main>
  );
}
