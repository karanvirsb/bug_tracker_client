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
        if (page != undefined && page >= 0) {
            // await queryClient.invalidateQueries([queryName], {
            //     refetchPage: (_page, index) => {
            //         return index === page + 1;
            //     },
            // });

            Promise.all([
                await queryClient.cancelQueries([queryName]),
                await queryClient.invalidateQueries([queryName]),
            ]);
        } else {
            await queryClient.invalidateQueries(queryName);
        }
    };

    return { invalidateQuery };
};

export default useInvalidateQuery;
