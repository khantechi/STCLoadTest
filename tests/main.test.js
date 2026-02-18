import { options } from '../config/scenarios.js';
import { e2eFlow } from '../scenarios/e2e.scenario.js';
import { loginScenario } from '../scenarios/login.scenario.js';
import { profileScenario } from '../scenarios/profile.scenario.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export { options };

export function e2e() {
  e2eFlow(__ENV.ENV || 'stg');
}

export function loginOnly() {
  loginScenario(__ENV.ENV || 'stg');
}
export function profileOnly() {
  profileScenario(__ENV.ENV || 'stg');
}
export function handleSummary(data) {
  return {
    "reports/summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
