import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { Mutation, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { resetModal } from "../../../Redux/Slices/modalSlice";

type props = {
    projectId: string;
};
const DeleteProjectModal = ({ projectId }: props) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();
    const mutation = useMutation(async (id: string) => {
        return await axiosPrivate("/project", {
            method: "delete",
            data: { id: id },
        });
    });

    const closeDeleteModal = () => {
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            mutation.mutateAsync(projectId, {
                onSuccess: () => {
                    queryClient.invalidateQueries("projectIds");
                    dispatch(resetModal());
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        const errorResp = JSON.parse(
                            error.response?.data.message
                        );
                        errorResp.forEach(
                            (elem: {
                                code: string;
                                inclusive: boolean;
                                message: string;
                                minimum?: number;
                                maxiumum?: number;
                                path: string[];
                                type: string;
                            }) => {
                                toast.error(elem.path[0] + " " + elem.message);
                            }
                        );
                    }
                },
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(JSON.parse(error.response?.data.message));
                toast.error(JSON.parse(error.response?.data.message));
            }
            console.log(
                "🚀 ~ file: DeleteProjectModal.tsx ~ line 57 ~ handleSubmit ~ error",
                error
            );
        }
    };

    return (
        <motion.div className='flex justify-center items-center w-full h-full'>
            <form
                action=''
                className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md w-1/4 max-w-[350px] min-w-[250px] sm:w-[90%] h-1/4 min-h-[200px] max-h-[250px]'
                onSubmit={handleSubmit}
            >
                <p className='text-center lg:text-xl m-md:text-lg'>
                    Are you sure you want to delete this project?
                </p>
                <div className='flex gap-2 sm:w-full sm:flex-col sm:items-stretch sm:px-16'>
                    <button className='btn bg-blue-400 !px-6' type='submit'>
                        Yes
                    </button>
                    <button
                        className='btn bg-red-400 !px-6'
                        onClick={closeDeleteModal}
                        type='button'
                    >
                        No
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default DeleteProjectModal;
