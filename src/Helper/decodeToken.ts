import jwt_decode from "jwt-decode";

export interface IDecode {
    UserInfo: {
        username: string;
        group_id: string;
        roles: [];
    };
    iat: number;
    exp: number;
}

/**
 *
 * @param token is an access token
 * @returns a decoded token with UserRoles and expiry date
 */
const decoder = (token: string): IDecode | undefined => {
    if (!token) return undefined;
    const decoded: IDecode | undefined = token ? jwt_decode(token) : undefined;

    return decoded;
};

export default decoder;
