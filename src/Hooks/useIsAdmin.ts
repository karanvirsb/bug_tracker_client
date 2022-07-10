type params = {
    roles: string[] | undefined;
};
const useIsAdmin = () => {
    const getRoles = (roles: params["roles"]) => {
        if (roles !== undefined) {
            const role: string = "1990";
            return roles.includes(role);
        } else {
            return [];
        }
    };
    return { getRoles };
};

export default useIsAdmin;
