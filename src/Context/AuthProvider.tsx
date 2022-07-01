import { createContext, useState } from "react";

export type IStates = {
    auth?: {
        username?: string | undefined;
        group_id?: string | undefined;
        roles?: [] | undefined;
        accessToken?: string | undefined;
    };
    setAuth?: React.Dispatch<React.SetStateAction<IStates["auth"]>>;
    persist?: string;
};

type Props = {
    children: JSX.Element;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<IStates["auth"]>({
        username: "",
        group_id: "",
        roles: [],
        accessToken: "",
    });

    const [persist, setPersist] = useState<IStates["persist"]>(
        JSON.parse(localStorage.getItem("bugTrackerPersist") || "{}") || false
    );

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
