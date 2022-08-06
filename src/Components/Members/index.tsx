import React, { useMemo } from "react";
import { useAppSelector } from "../../Hooks/hooks";

type props = { usersArr: string[] };

type user = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

type userElementProps = {
    usersArr: user[];
};

const Members = ({ usersArr }: props) => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );

    // looping over each user of the group and adding them to users
    const users: user[] = [];
    for (const user of groupUsers) {
        if (usersArr.includes(user.username)) {
            users.push(user);
        }
    }

    return (
        <>
            {users ? (
                <UserElements usersArr={users}></UserElements>
            ) : (
                <div>No Users</div>
            )}
        </>
    );
};

const UserElements = ({ usersArr }: userElementProps) => {
    return (
        <>
            {useMemo(() => {
                return usersArr?.map((user: user, index: number) => {
                    if (index === usersArr.length - 1) {
                        return (
                            <span key={user.username}>
                                {`${user.firstName} ${user.lastName}`}
                            </span>
                        );
                    }
                    return (
                        <span key={user.username}>
                            {`${user.firstName} ${user.lastName}, `}
                        </span>
                    );
                });
            }, [usersArr])}
        </>
    );
};
export default Members;
