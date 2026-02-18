# STC Performance Automation Framework (k6 + InfluxDB + Grafana)

This repository contains a performance automation framework for API load testing using:
- `k6` for test execution and metrics generation
- `InfluxDB` for time-series metric storage
- `Grafana` for real-time dashboard visualization
- `Chronograf` (optional) for InfluxDB exploration

## Diagrams

- Architecture and flow diagrams: `docs/architecture-flow.md`

## 1. Framework Components

### A. Test Runner and Scripts (`k6`)
- Entry point: `tests/main.test.js`
- Scenario definitions: `config/scenarios.js`
- Environment configuration: `config/environments.js`
- Flow/scenario files: `scenarios/*.scenario.js`
- API service actions: `services/*.js`
- Shared helpers and headers: `utils/*.js`
- Test users: `data/users.json`

`tests/main.test.js` exports k6 exec functions:
- `loginOnly()`
- `profileOnly()`
- `e2e()`

It also exports `handleSummary()` to generate:
- HTML report: `reports/summary.html`
- Console summary via `textSummary`

### B. Metrics Storage (`InfluxDB`)
- Service defined in `docker-compose.yml`
- Image: `influxdb:1.8`
- Port: `8086`
- Database: `k6`

k6 writes metrics using output:
- `--out influxdb=http://localhost:8086/k6`

### C. Visualization (`Grafana`)
- Service defined in `docker-compose.yml`
- Image: `grafana/grafana:8.5.21`
- Port: `3000`
- Data source provisioning file: `grafana-datasource.yaml`
- Dashboard provisioning file: `grafana-dashboard.yaml`
- Dashboard folder mounted at: `dashboards/`

Current status:
- `dashboards/` exists but is empty. Add dashboard JSON files there for auto-provisioning.

### D. Optional Influx UI (`Chronograf`)
- Service defined in `docker-compose.yml`
- Image: `chronograf:1.8`
- Port: `8888`
- Useful for direct InfluxDB inspection and query validation

## 2. Execution Flow

1. `k6 run tests/main.test.js`
2. `options` from `config/scenarios.js` selects scenarios
3. Each scenario calls exported exec function in `tests/main.test.js`
4. Scenario function runs API chain from `scenarios/*.scenario.js`
5. Service layer (`services/*.js`) sends HTTP requests and validates responses
6. Metrics stream to InfluxDB
7. Grafana dashboards read from InfluxDB and visualize trends
8. Summary report is saved to `reports/summary.html`

## 3. Scenario Configuration

`config/scenarios.js` supports scenario-by-name selection using env var:
- `SCENARIO=<scenario_name>`

Available scenarios:
- `login_load`
- `profile_load`
- `e2e_load`
- `login_low`
- `login_spike`
- `login_ramp`

If `SCENARIO` is omitted, all configured scenarios are enabled.

## 4. Environment Configuration

`config/environments.js` defines environments:
- `stg`
- `qa`

Each includes:
- `baseUrl`
- `appKey`
- default headers
- subscription signing key

Runtime selection:
- `ENV=stg` or `ENV=qa`

## 5. How to Run

### Start observability stack
```bash
docker compose up -d influxdb grafana chronograf
```

### Run local smoke test (no Influx/Grafana required)
```bash
SCENARIO=login_low ENV=stg k6 run tests/main.test.js
```

### Run a specific scenario
```bash
SCENARIO=login_load ENV=stg k6 run --out influxdb=http://localhost:8086/k6 tests/main.test.js
```

### Example: profile scenario
```bash
SCENARIO=profile_load ENV=stg k6 run --out influxdb=http://localhost:8086/k6 tests/main.test.js
```

### Open tools
- Grafana: `http://localhost:3000`
- Chronograf: `http://localhost:8888`
- InfluxDB endpoint: `http://localhost:8086`

## 6. CI (GitHub Actions)

- Workflow file: `.github/workflows/k6-ci.yml`
- Trigger: pull requests, pushes to `main`, and manual dispatch
- Default CI run: `SCENARIO=login_low`, `ENV=stg`
- Quality gates: thresholds from `config/scenarios.js`
  - `http_req_failed`: `< 5%`
  - `checks`: `> 95%`
  - `http_req_duration p(95)`: `< 1500ms`

If any threshold is breached, CI fails.

## 7. Repository Structure

```text
config/
  environments.js        # env-specific base URL, app key, secrets
  scenarios.js           # k6 scenario definitions and SCENARIO filtering
context/
  userContext.js         # per-user runtime context
data/
  users.json             # test users
scenarios/
  *.scenario.js          # business flows (login/profile/e2e/...)
services/
  *.js                   # API request implementations
tests/
  main.test.js           # k6 entrypoint, exported exec functions, summary
utils/
  *.js                   # helpers, headers, data loading, crypto
reports/
  summary.html           # generated HTML run report
```

## 8. Notes and Best Practices

- Keep scenario names stable because runtime execution depends on `SCENARIO` value.
- Prefer `constant-arrival-rate` for RPS-oriented tests and `ramping-vus` for concurrency ramp patterns.
- Validate response shapes in service layer before reading nested fields.
- Keep environment secrets and keys separated per environment.
- Store Grafana dashboard JSON files in `dashboards/` for provisioning consistency.
