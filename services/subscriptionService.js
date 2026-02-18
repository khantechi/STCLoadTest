import http from 'k6/http';
import { check } from 'k6';
import { generateSignature } from '../utils/crypto.js';

const SSK = 'kUdTaNh1LmZiRRirowakufUyvg7SiwLX';

export function getSubscriptionStatus(ctx, baseUrl) {
  const reqUrl = `/bridge/v2/webB2CGDMSTGExy0sVDlZMzNDdUyZ/users/accounts/${ctx.accountId}/subscriptions/status`;
  const signature = generateSignature(reqUrl, 'GET', SSK);

  const res = http.get(`${baseUrl}${reqUrl}`, {
    headers: { signature },
    tags: { name: 'Get Subscription Status API' },
  });

  check(res, { 'subscription fetched': r => r.status === 200 });

  ctx.subscriptionResponse = res.json();
  return ctx;
}
