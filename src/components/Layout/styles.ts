import styled, { keyframes } from "styled-components"
import { Button, IconFa, ThemeType } from "@cruk/cruk-react-components"

const rotate = keyframes`
    from {
      transform: rotate(20deg);
    }
    to  {
       transform: rotate(90deg);
    }
`

// makes sure footer stays near the bottom of the screen
export const PageContentWrapper = styled.div`
	min-height: calc(100vh - 200px);
	margin: 0 auto;
	width: 100%;
	max-width: ${({ theme }: { theme: ThemeType }) => theme.breakpoint.desktopLarge};
	padding: 0 ${({ theme }: { theme: ThemeType }) => theme.spacing.s};
	background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundLight};
`

export const FooterWrapper = styled.div`
	padding-bottom: ${({ theme }: { theme: ThemeType }) => theme.spacing.xxl};
	clear: both;
`

export const StyledUL = styled.ul`
	padding-left: ${({ theme }: { theme: ThemeType }) => theme.spacing.xxs};
	list-style: none;
`

export const StyledButton = styled(Button)`
	border: none;
	text-transform: none;
	text-decoration: none;
	min-height: 0;
	font-weight: ${({ theme }: { theme: ThemeType }) => theme.typography.fontWeightHeavy};
	font-family: ${({ theme }: { theme: ThemeType }) => theme.typography.fontFamilyBase};
	font-size: ${({ theme }: { theme: ThemeType }) => theme.fontSizes.s};
	color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
	position: relative;
	text-align: left;
`

export const StyledLi = styled.li`
	margin-bottom: ${({ theme }: { theme: ThemeType }) => theme.spacing.xxs};
	a {
		font-size: ${({ theme }: { theme: ThemeType }) => theme.fontSizes.s};
	}
`

export const StyledIcon = styled(IconFa)`
	left: 97%;
	top: 26%;
	position: absolute;
	animation: ${({ active }: { active: boolean }) => (active ? rotate : null)} 0.1s normal forwards;
`
