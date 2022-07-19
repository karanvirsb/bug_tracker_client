import React, { useMemo } from "react";
import { useAppSelector } from "../../Hooks/hooks";

type props = { usersArr: string[] };

type user = {
    username: String;
    email: String;
    firstName: String;
    lastName: String;
};

type userElementProps = {
    users: user[];
};
const Members = ({ usersArr }: props) => {
    // const axiosPrivate = useAxiosPrivate();

    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );

    const users = [];
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    const UserElements = ({ users }: userElementProps) => {
        return (
            <>
                {useMemo(() => {
                    return users?.map((user: user, index: number) => {
                        if (index === users.length - 1) {
                            return (
                                <span key={user.username as string}>
                                    {`${user.firstName} ${user.lastName}`}
                                </span>
                            );
                        }
                        return (
                            <span key={user.username as string}>
                                {`${user.firstName} ${user.lastName}, `}
                            </span>
                        );
                    });
                }, [users])}
            </>
        );
    };

    return (
        <>
            {users ? (
                <UserElements users={users}></UserElements>
            ) : (
                <div>No Users</div>
            )}
        </>
    );
};

export default Members;
