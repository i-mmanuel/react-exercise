"use client";

import { Collapse, Loader, ErrorText } from "@cruk/cruk-react-components";
import { NasaResponse, NasaSearchParams } from "../types";
import { urlNasaSearch } from "../services/nasa";
import { useQuery } from "@tanstack/react-query";

export function List() {
	const values: NasaSearchParams = {
		keywords: "moon",
		mediaType: "audio",
		yearStart: 2000,
	};

	const urlNasaSearchUrl = values ? urlNasaSearch(values as NasaSearchParams) : "";

	console.log(urlNasaSearchUrl);

	const { data, isLoading, error } = useQuery<NasaResponse>(
		["nasaSearch", values],
		() => fetch(urlNasaSearchUrl).then(res => res.json()),
		{ enabled: !!urlNasaSearchUrl.length }
	);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorText>Error loading data</ErrorText>;
	}

	// TODO somehow render results
	const showNasaData = () =>
		!!data &&
		data.collection.items.map(
			item =>
				item.data[0] && (
					<Collapse id={item.data[0].nasa_id} key={item.data[0].nasa_id} headerTitleText={item.data[0].title}>
						{item.data[0].description}
					</Collapse>
				)
		);

	return <>{!!data && showNasaData()}</>;
}
