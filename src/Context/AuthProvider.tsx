import { createContext, useState } from "react";

export interface IStates {
    auth?: {
        username: string;
        group_id: string;
        roles: [];
        accessToken: string;
    };
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

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
