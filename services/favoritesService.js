import http from 'k6/http';
import { check } from 'k6';
import { getHeaders } from '../utils/headers.js';

export function addFavorites(ctx, baseUrl) {
  const res = http.post(
    `${baseUrl}/profiles/v2/webB2CGDMSTGExy0sVDlZMzNDdUyZ/profile/${ctx.profileName}/favorites/channels`,
    JSON.stringify({
      ids: [
        "http://data.entertainment.tv.theplatform.eu/entertainment/data/Channel/264485928076",
        "http://data.entertainment.tv.theplatform.eu/entertainment/data/Channel/697658920128",
      ],
    }),
    {
      headers: {
        ...getHeaders(),
        Authorization: ctx.authToken,
        identityToken: ctx.identityToken,
      },
      tags: { name: 'Add Favorites API' },
    }
  );

  check(res, { 'favorites added': r => r.status === 200 });
  ctx.favoritesResponse = res.json();
  return ctx;
}
