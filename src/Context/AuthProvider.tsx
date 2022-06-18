import { createContext, useState } from "react";

export interface IStates {
    auth?: {
        username: string;
        group_id: string;
        roles: [];
        accessToken: string;
    };
    persist?: string;
}

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
