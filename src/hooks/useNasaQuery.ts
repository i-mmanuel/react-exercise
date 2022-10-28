import { useQuery } from "@tanstack/react-query";

import urlNasaSearch from "../services/nasa";
import { NasaResponse, NasaSearchParams } from "../types";

export const useNasaQuery = (params: NasaSearchParams | undefined) => {
  const urlNasaSearchUrl = params ? urlNasaSearch(params) : "";

  // if params is empty then no request happens
  return useQuery<NasaResponse>(
    ["nasaSearch"],
    () => fetch(urlNasaSearchUrl).then((res) => res.json()),
    { enabled: !!params }
  );
};

export default useNasaQuery;
