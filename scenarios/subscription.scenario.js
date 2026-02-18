import { createUserContext } from '../context/userContext.js';
import { login } from '../services/loginService.js';
import { getSubscriptionStatus } from '../services/subscriptionService.js';
import { ENV } from '../config/environments.js';
import { getUser } from '../utils/helpers.js';

export function subscriptionScenario(env) {
  const baseUrl = ENV[env].baseUrl;
  const user = getUser();

  const ctx = createUserContext(user);

  // Pre-req
  login(ctx, baseUrl);

  // API under test
  getSubscriptionStatus(ctx, baseUrl);
}
