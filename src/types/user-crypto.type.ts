interface UserCrypto {
    sub: number,
    iss?: string;
    aud?: string;
    exp?: number;
    nbf?: number;
    jti?: string;
    iat?: number
}

export default UserCrypto;