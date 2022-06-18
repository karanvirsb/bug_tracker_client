import { createContext, useState } from "react";

type States = {
    auth: {
        username: String;
        group_id: String;
        roles: String;
    };
};

type Props = {
    children: JSX.Element;
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<States["auth"]>({
        username: "",
        group_id: "",
        roles: "",
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
