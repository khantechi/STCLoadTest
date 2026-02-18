import { createUserContext } from '../context/userContext.js';
import { login } from '../services/loginService.js';
import { ENV } from '../config/environments.js';
import { getUser } from '../utils/helpers.js';

export function loginScenario(env) {
  const baseUrl = ENV[env].baseUrl;
  const appKey = ENV[env].appKey;
  const user = getUser();

  const ctx = createUserContext(user);
  login(ctx, baseUrl, appKey);
}
