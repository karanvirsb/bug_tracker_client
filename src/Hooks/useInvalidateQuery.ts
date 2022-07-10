import { useQueryClient } from "react-query";

type props = {
    queryName: string;
};
const useInvalidateQuery = () => {
    const queryClient = useQueryClient();

    const invalidateQuery = ({ queryName }: props) => {
        queryClient.invalidateQueries(queryName);
    };

    return { invalidateQuery };
};

export default useInvalidateQuery;
