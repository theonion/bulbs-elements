let settings = {
  development: {
    FREEWHEEL_NETWORK_ID: '111976',
  },
  test: {
    FREEWHEEL_NETWORK_ID: '111976',
  },
  production: {
    FREEWHEEL_NETWORK_ID: '123456',
  }
}

function getEnvironment () {
  if (process.env.NODE_ENV === 'production') {
    return settings.production;
  } else if ( process.env.NODE_ENV === 'test') {
    return settings.test;
  } else {
    return settings.development;
  }
};

let SETTINGS = getEnvironment();
export default SETTINGS;
