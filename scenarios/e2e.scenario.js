import { createUserContext } from '../context/userContext.js';
import { login } from '../services/loginService.js';
import { getProfiles } from '../services/profileService.js';
import { switchProfile } from '../services/profileSwitchService.js';
import { getSubscriptionStatus } from '../services/subscriptionService.js';
import { addFavorites } from '../services/favoritesService.js';
import { ENV } from '../config/environments.js';
import { getUser } from '../utils/helpers.js';

export function e2eFlow(env) {
  const ctx = createUserContext(getUser());
  const baseUrl = ENV[env].baseUrl;
  const appKey = ENV[env].appKey;

  login(ctx, baseUrl, appKey);
  getProfiles(ctx, baseUrl);
  switchProfile(ctx, baseUrl);
  getSubscriptionStatus(ctx, baseUrl);
  addFavorites(ctx, baseUrl);
}
