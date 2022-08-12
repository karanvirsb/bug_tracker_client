import { useAppSelector } from "../../../Hooks/hooks";
import { users } from "../../../Redux/Slices/groupSlice";

type checkUserPermissionsProps = {
    users?: users[];
    usersString?: string[];
};
const useCheckTicketPermissions = () => {
    // checks to see if the user is part of the members of the project if so they returns true else returns false
    const loggedInUser = useAppSelector((state) => state.persistedReducer.user);
    const checkUserPermissions = ({
        users,
        usersString,
    }: checkUserPermissionsProps): boolean => {
        let isUserApartOfProject = false;
        if (users) {
            for (const user of users) {
                if (user.username === loggedInUser.username) {
                    isUserApartOfProject = true;
                }
            }
        }
        if (usersString) {
            for (const user of usersString) {
                if (user === loggedInUser.username) {
                    isUserApartOfProject = true;
                }
            }
        }
        return isUserApartOfProject;
    };

    return { checkUserPermissions };
};

export default useCheckTicketPermissions;
