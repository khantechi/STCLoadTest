const scenarios = {
  login_load: {
    executor: 'constant-arrival-rate',
    timeUnit: '1s',
    rate: 2,
    duration: '30s',
    preAllocatedVUs: 2,
    maxVUs: 5,
    exec: 'loginOnly',
  },
  profile_load: {
    executor: 'constant-arrival-rate',//fixed number of iterations per second - good for consistent load testing - RPS focussed
    timeUnit: '1s',
    rate: 2,// 2 iterations per second
    duration: '30s',
    preAllocatedVUs: 1, 
    maxVUs: 5,
    exec: 'profileOnly',
  },
  e2e_load: {
    executor: 'ramping-vus',
    stages: [
      { duration: '30s', target: 1 },
      { duration: '30s', target: 2 },
      { duration: '30s', target: 0 },
    ],
    exec: 'e2e',
  },
  login_low: {
    executor: 'constant-vus',// simple load with a fixed number of VUs - good for basic smoke testing
    vus: 1,
    duration: '30s',
    exec: 'loginOnly',
    tags: { test_type: 'login_smoke' },
  },
  login_spike: {
    executor: 'ramping-arrival-rate', //smoothly increase the load to simulate a spike - similar to production traffic patterns
    startRate: 1,
    timeUnit: '1s',
    stages: [
      { duration: '30s', target: 5 },
      { duration: '30s', target: 0 },
    ],
    preAllocatedVUs: 5,
    maxVUs: 5,
    exec: 'loginOnly',
    tags: { test_type: 'login_smoke' },
  },
  login_ramp: {
    executor: 'ramping-vus',
    stages: [
      { duration: '15s', target: 2 },
      { duration: '30s', target: 5 },
      { duration: '15s', target: 0 },
    ],
    exec: 'loginOnly',
  },
};

const selectedScenario = __ENV.SCENARIO;
if (selectedScenario && !scenarios[selectedScenario]) {
  throw new Error(
    `Invalid SCENARIO "${selectedScenario}". Available scenarios: ${Object.keys(scenarios).join(', ')}`
  );
}

export const options = {
  scenarios: selectedScenario
    ? { [selectedScenario]: scenarios[selectedScenario] }
    : scenarios,
  thresholds: {
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
    http_req_duration: ['p(95)<1500'],
  },
};
