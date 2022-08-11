import { useQueryClient } from "react-query";

type props = {
    queryName: string;
    page?: number;
};
/**
 *
 * @returns invalidateQuery a function which calls UseQueryClient to invalidate / refresh a query
 */
const useInvalidateQuery = () => {
    const queryClient = useQueryClient();

    const invalidateQuery = async ({ queryName, page }: props) => {
        if (page) {
            await queryClient.invalidateQueries([queryName], {
                refetchPage: (page, index) => index === page,
            });
        } else {
            await queryClient.invalidateQueries(queryName);
        }
    };

    return { invalidateQuery };
};

export default useInvalidateQuery;
