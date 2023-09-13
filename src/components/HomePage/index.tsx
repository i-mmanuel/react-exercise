import { Heading, Text, Box } from "@cruk/cruk-react-components"
import { NasaSearchParams } from "../../types"
import Results from "../Results"

export const HomePage = () => {
	//
	// form and validation code here

	const exampleParam: NasaSearchParams = {
		keywords: "moon",
		yearStart: 2000,
		mediaType: "image",
	}

	return (
		<Box marginTop="s" paddingTop="s">
			<Heading h1>React Exercise</Heading>

			<Text>Form goes here</Text>

			<Results searchParams={exampleParam} />
		</Box>
	)
}

export default HomePage
