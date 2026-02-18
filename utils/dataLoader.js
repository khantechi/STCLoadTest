import { SharedArray } from 'k6/data';

export const users = new SharedArray('users', function () {
  return JSON.parse(open('../data/users.json'));
});
