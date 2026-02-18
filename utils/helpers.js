import { users } from './dataLoader.js';

/**
 * Distribute users evenly across VUs
 */
export function getUser() {
  return users[(__VU - 1) % users.length];
}


export function thinkTime(seconds = 1) {
  if (seconds > 0) {
    sleep(seconds);
  }
}
