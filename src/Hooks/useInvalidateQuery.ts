import { useQueryClient } from "react-query";

type props = {
    queryName: string;
};
/**
 *
 * @returns invalidateQuery a function which calls UseQueryClient to invalidate / refresh a query
 */
const useInvalidateQuery = () => {
    const queryClient = useQueryClient();

    const invalidateQuery = async ({ queryName }: props) => {
        await queryClient.invalidateQueries(queryName);
    };

    return { invalidateQuery };
};

export default useInvalidateQuery;
