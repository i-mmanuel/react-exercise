"use client";

import { Collapse, Loader, Text, ErrorText } from "@cruk/cruk-react-components";
import { NasaResponse, NasaSearchParams } from "../types";
import { urlNasaSearch } from "../services/nasa";
import { useQuery } from "@tanstack/react-query";

export function List({ values }: { values: NasaSearchParams | undefined }) {
	const urlNasaSearchUrl = values ? urlNasaSearch(values) : "";

	if (!values) {
		return null;
	}

	const { data, isLoading, error } = useQuery<NasaResponse>(
		["nasaSearch", values],
		() => fetch(urlNasaSearchUrl).then(res => res.json()),
		{ enabled: !!urlNasaSearchUrl.length }
	);

	if (isLoading && values.keywords.length > 0) {
		return <Loader />;
	}

	if (error) {
		return <ErrorText>Error loading data</ErrorText>;
	}

	// TODO somehow render results
	const showNasaData = () => {
		if (data && data.collection.items.length > 0) {
			return data.collection.items.map(item =>
				item.data[0] ? (
					<Collapse id={item.data[0].nasa_id} key={item.data[0].nasa_id} headerTitleText={item.data[0].title}>
						{item.data[0].description}
					</Collapse>
				) : null
			);
		} else {
			return <ErrorText>No items found.</ErrorText>;
		}
	};

	return <>{!!data && showNasaData()}</>;
}
