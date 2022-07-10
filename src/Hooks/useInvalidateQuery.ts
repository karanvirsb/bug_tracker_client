import { useQueryClient } from "react-query";

type props = {
    queryName: string;
};
const useInvalidateQuery = () => {
    const queryClient = useQueryClient();

    const invalidateQuery = async ({ queryName }: props) => {
        await queryClient.invalidateQueries(queryName);
    };

    return { invalidateQuery };
};

export default useInvalidateQuery;
