export function createUserContext(user) {
  return {
    username: user.username,
    password: user.password,
    userAgent: user.userAgent,

    authToken: null,
    guid: null,
    accountId: null,
    refreshToken: null,
    identityToken: null,

    profileGuid: null,
    profileName: null,

    subscriptionResponse: null,
    favoritesResponse: null,
  };
}
