const AuthGuardSetting = {
    excludedPaths: [
        '/api/auth/login',
        '/api/auth/register',
        '/api/public/*'
    ],
}

export default AuthGuardSetting;