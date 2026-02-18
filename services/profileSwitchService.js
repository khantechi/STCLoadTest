import http from 'k6/http';
import { check } from 'k6';
import { getHeaders } from '../utils/headers.js';

export function switchProfile(ctx, baseUrl) {
  const res = http.put(
    `${baseUrl}/profiles/v2/${ctx.apiKey}/users/${ctx.username}/profile/switch`,
    JSON.stringify({ profileGuid: ctx.profileGuid }),
    {
      headers: {
        ...getHeaders(),
        Authorization: ctx.authToken,
        identityToken: ctx.identityToken,
        epochMs: Date.now().toString(),
        encPassword: 'MTIzNDU2',
      },
      tags: { name: 'Profile Switch API' },
    }
  );

  check(res, { 'profile switched': r => r.status === 200 });

  ctx.identityToken = res.json('identityToken');
  return ctx;
}
