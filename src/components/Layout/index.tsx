import { ReactNode, useState } from "react"
import Head from "next/head"
import { Footer, Link, Header } from "@cruk/cruk-react-components"

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { PageContentWrapper, StyledUL, StyledLi, StyledButton, FooterWrapper, StyledIcon } from "./styles"

type LayoutProps = {
	children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const [showLinks, setShowLinks] = useState(false)

	const handleClick = () => {
		setShowLinks(!showLinks)
	}

	return (
		<main>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header />
			<PageContentWrapper id="main">{children}</PageContentWrapper>
			<FooterWrapper>
				<Footer>
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/about-us/contact-us">
						Contact us
					</Link>
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/terms-and-conditions">
						Terms & Conditions
					</Link>
					<StyledButton appearance="tertiary" onClick={handleClick}>
						Fees and charges
						<StyledIcon active={showLinks} faIcon={faChevronRight} size="11px" color="primary" />
					</StyledButton>
					{showLinks ? (
						<StyledUL>
							<StyledLi>
								<Link appearance="secondary" href="https://www.cancerresearchuk.org/terms-and-conditions">
									Cancer Research UK
								</Link>
							</StyledLi>
							<StyledLi>
								<Link appearance="secondary" href="https://www.cancerresearchuk.org/terms-and-conditions">
									Stand Up to Cancer
								</Link>
							</StyledLi>
						</StyledUL>
					) : null}
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/privacy-statement">
						Privacy
					</Link>
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/terms-and-conditions/cookies-policy">
						Cookies
					</Link>
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/accessibility">
						Accessibility
					</Link>
					<Link appearance="secondary" href="https://www.cancerresearchuk.org/cancer-research-uk-giving-pages-help">
						Help
					</Link>
				</Footer>
			</FooterWrapper>
		</main>
	)
}

export default Layout
