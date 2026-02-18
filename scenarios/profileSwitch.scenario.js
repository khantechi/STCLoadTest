import { createUserContext } from '../context/userContext.js';
import { login } from '../services/loginService.js';
import { getProfiles } from '../services/profileService.js';
import { switchProfile } from '../services/profileSwitchService.js';
import { ENV } from '../config/environments.js';
import { getUser } from '../utils/helpers.js';

export function profileSwitchScenario(env) {
  const baseUrl = ENV[env].baseUrl;
  const user = getUser();

  const ctx = createUserContext(user);

  // Pre-req chain
  login(ctx, baseUrl);
  getProfiles(ctx, baseUrl);

  // API under test
  switchProfile(ctx, baseUrl);
}
