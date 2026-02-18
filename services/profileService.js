import http from 'k6/http';
import { check } from 'k6';
import { getHeaders } from '../utils/headers.js';

export function getProfiles(ctx, baseUrl) {
  const res = http.get(
    `${baseUrl}/profiles/v4/${ctx.apiKey}/users/${ctx.username}/profiles`,
    {
      headers: getHeaders({
        authToken: ctx.authToken,
        identityToken: ctx.identityToken,
      }),
      tags: { name: 'Get Profiles API' },
    }
  );
  const ok = check(res, { 'profiles fetched': r => r.status === 200 });
  if (!ok) {
    throw new Error(`Get Profiles failed with status ${res.status}: ${res.body}`);
  }

  const body = res.json();
  const profiles = Array.isArray(body) ? body : body?.profiles;
  const profile = profiles?.[0];
  //console.log('profiles response body:', body);
  ctx.profileGuid = body.data.profileGuid;
  ctx.profileName = body.data.profileName;
  return ctx;
}
