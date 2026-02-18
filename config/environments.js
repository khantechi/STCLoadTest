export const ENV = {
  stg: {
    name: 'staging',
    baseUrl: 'https://stg-hc-micro.intigral-ott.net',
    appKey: '18ebec43',
    // Static headers / constants used across APIs
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    // Security / crypto configs
    subscription: {
      ssk: 'kUdTaNh1LmZiRRirowakufUyvg7SiwLX',
    },
  },

  qa: {
    name: 'qa',
    baseUrl: 'https://qa-hc-micro.intigral-ott.net',
    appKey: '18ebec43',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    subscription: {
      ssk: '',
    },
  },

  lt: {
    name: 'lt',
    baseUrl: 'https://perf-micro-api-hc.intigral-ott.net/',
    appKey: '18ebec43',
    defaultHeaders: {
      'Content-Type': 'application/json',
    },
    subscription: {
      ssk: '',
    },
  }
}