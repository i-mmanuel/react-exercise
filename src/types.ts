export type NasaSearchParams = {
	keywords: string;
	yearStart: number | undefined;
	mediaType: "audio" | "video" | "image";
	page: number;
	pageSize: number;
};

export type NasaResponse = {
	collection: {
		version: string;
		href: string;
		items: ItemsType[];
		metadata: {
			total_hits: number;
		};
	};
};

export type ItemsType = {
	href: string;
	data: DataType[];
	links: LinkType[];
};

export type DataType = {
	center: string;
	title: string;
	keywords: string[];
	location: string;
	nasa_id: string;
	date_created: string;
	media_type: "audio" | "video" | "image";
	description: string;
};

export type LinkType = {
	href: string;
	rel: string;
	render: string;
};
