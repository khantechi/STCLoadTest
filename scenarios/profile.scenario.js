import { createUserContext } from '../context/userContext.js';
import { login } from '../services/loginService.js';
import { getProfiles } from '../services/profileService.js';
import { ENV } from '../config/environments.js';
import { getUser } from '../utils/helpers.js';

export function profileScenario(env) {
  const baseUrl = ENV[env].baseUrl;
  const appKey = ENV[env].appKey;
  const user = getUser();

  const ctx = createUserContext(user);

  // Pre-req
  login(ctx, baseUrl, appKey);

  // API under test
  getProfiles(ctx, baseUrl);
}
