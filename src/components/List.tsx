"use client";

import { Collapse, Loader, Pagination, ErrorText } from "@cruk/cruk-react-components";
import { NasaResponse, NasaSearchParams } from "../types";
import { urlNasaSearch } from "../services/nasa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function List({ values }: { values: NasaSearchParams | undefined }) {
	if (!values) {
		return <ErrorText>No search parameters provided</ErrorText>;
	}

	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 10;
	const urlNasaSearchUrl = values ? urlNasaSearch({ ...values, page: currentPage, pageSize: itemsPerPage }) : "";

	const { data, isLoading, error } = useQuery<NasaResponse>(
		["nasaSearch", values, currentPage],
		() => fetch(urlNasaSearchUrl).then(res => res.json()),
		{ enabled: !!urlNasaSearchUrl, keepPreviousData: true }
	);

	if (isLoading) {
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

	const pagerCallback = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div>
			{showNasaData()}

			<Pagination
				current={currentPage}
				items={data?.collection.metadata.total_hits || 0}
				pagerCallback={pagerCallback}
				perPage={itemsPerPage}
			/>
		</div>
	);
}
