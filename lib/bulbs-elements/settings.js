let settings = {
  base: {
    BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID: 'UA-223393-14',
    BULBS_ELEMENTS_COMSCORE_ID: '6036328',
    RESP: 'vmap1',
  },
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
  let envValues;
  if (process.env.NODE_ENV === 'production') {
    envValues = settings.production;
  } else if ( process.env.NODE_ENV === 'test') {
    envValues = settings.test;
  } else {
    envValues = settings.development;
  }
  return Object.assign(settings.base, envValues);
};

let SETTINGS = getEnvironment();
export default SETTINGS;
