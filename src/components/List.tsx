"use client";

import { Collapse, Loader, Pagination, ErrorText, Text } from "@cruk/cruk-react-components";
import { NasaResponse, NasaSearchParams } from "../types";
import { urlNasaSearch } from "../services/nasa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function List({ values }: { values: NasaSearchParams | undefined }) {
	if (!values) {
		return null;
	}

	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 10;
	const urlNasaSearchUrl = values ? urlNasaSearch({ ...values, page: currentPage, pageSize: itemsPerPage }) : "";
	const [mediaContent, setMediaContent] = useState<JSX.Element | null>(null);

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

	// Load media content dynamically
	async function loadMedia(mediaType: "audio" | "video" | "image", jsonUrl: string) {
		try {
			const response = await fetch(jsonUrl);
			const mediaUrls = await response.json();

			if (!Array.isArray(mediaUrls) || mediaUrls.length === 0) {
				return <Text>No media available</Text>;
			}

			const mediaUrl = mediaUrls[0];

			switch (mediaType) {
				case "audio":
					return <audio controls src={mediaUrl} />;
				case "video":
					return <video controls src={mediaUrl} style={{ maxWidth: "100%" }} />;
				case "image":
					return <img src={mediaUrl} alt="NASA media" style={{ maxWidth: "100%" }} />;
				default:
					return <Text>Unsupported media type</Text>;
			}
		} catch (error) {
			return <ErrorText>There has been an error, try again later.</ErrorText>;
		}
	}

	// Render NASA Data
	const showNasaData = () => {
		if (data && data.collection.items.length > 0) {
			return data.collection.items.map(item => {
				if (!item.data[0]) return null;

				const handleCollapseToggle = async (isOpen: boolean) => {
					if (isOpen && !mediaContent && item.data[0]) {
						const media = await loadMedia(item.data[0].media_type, item.href);
						setMediaContent(media);
					} else if (!isOpen) {
						setMediaContent(null);
					}
				};

				return (
					<Collapse
						id={item.data[0].nasa_id}
						key={item.data[0].nasa_id}
						headerTitleText={item.data[0].title}
						onOpenChange={handleCollapseToggle}
					>
						{mediaContent}
						<p>{item.data[0].description}</p>
					</Collapse>
				);
			});
		} else {
			return <ErrorText>No items found.</ErrorText>;
		}
	};

	// Pagination callback
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
