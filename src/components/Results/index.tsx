import { Text } from "@cruk/cruk-react-components";
import { NasaSearchParams } from "../../types";
import useNasaQuery from "../../hooks/useNasaQuery";

type ResultsProps = {
  searchParams: NasaSearchParams;
};

export const Results = ({ searchParams }: ResultsProps) => {
  const { data, error, isFetching } = useNasaQuery(searchParams);

  return (
    <>
      <Text>results go here</Text>
      <Text>{JSON.stringify(data)}</Text>;
    </>
  );
};

export default Results;
