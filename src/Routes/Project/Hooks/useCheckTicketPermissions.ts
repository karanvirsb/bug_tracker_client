import { useAppSelector } from "../../../Hooks/hooks";
import { users } from "../../../Redux/Slices/groupSlice";

type checkUserPermissionsProps = {
    users?: users[];
    usersString?: string[];
    ticketId?: string;
};
const useCheckTicketPermissions = () => {
    // checks to see if the user is part of the members of the project if so they returns true else returns false
    const loggedInUser = useAppSelector((state) => state.persistedReducer.user);
    const tickets = useAppSelector((state) => state.tickets.tickets);
    const checkUserPermissions = ({
        users,
        usersString,
        ticketId,
    }: checkUserPermissionsProps): boolean => {
        let isUserApartOfProject = false;
        if (ticketId) {
            const foundTicket = tickets.find(
                (ticket) => ticket.ticketId === ticketId
            );

            if (loggedInUser.username === foundTicket?.reporterId) {
                isUserApartOfProject = true;
            } else {
                if (foundTicket)
                    for (const user of foundTicket?.assignedDev) {
                        if (user === loggedInUser.username) {
                            isUserApartOfProject = true;
                        }
                    }
            }
        }
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
