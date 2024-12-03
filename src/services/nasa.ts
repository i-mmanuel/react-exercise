import { NasaSearchParams } from "../types";

export const NASA_API_URL = "https://images-api.nasa.gov/search";

export const urlNasaSearch = ({ keywords, mediaType, yearStart, pageSize, page }: NasaSearchParams): string => {
	const paramsObjectWithSnakeCaseKeys = {
		keywords,
		media_type: mediaType,
	 page: `${page}`,
		...(!!pageSize && !Number.isNaN(pageSize) && { page_size: `${pageSize}` }),
		...(!!yearStart && !Number.isNaN(yearStart) && { year_start: `${yearStart}` }),
	};
	const paramsString = new URLSearchParams(paramsObjectWithSnakeCaseKeys).toString();
	return `${NASA_API_URL}?${paramsString}`;
};
