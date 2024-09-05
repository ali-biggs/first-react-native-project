import {AuthConfiguration} from 'react-native-app-auth';
import DeviceInfo from 'react-native-device-info';

const STRAVA_URL = 'https://www.strava.com';
// const STRAVA_CLIENT_ID = '133498';
// const STRAVA_CLIENT_SECRET = 'b41056bf02c3f681bca0b0cb15010c04fc5cb9ec';
const STRAVA_CLIENT_ID = '89250';
const STRAVA_CLIENT_SECRET = '5e8e8b10a5675c6ef110dd589436e708520be4d4';

export const STRAVA_CONFIG: AuthConfiguration = {
  issuer: STRAVA_URL,
  clientId: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  redirectUrl: `${DeviceInfo.getBundleId()}://oauth`,
  scopes: ['activity:read_all,activity:write'],
  serviceConfiguration: {
    authorizationEndpoint: `${STRAVA_URL}/oauth/mobile/authorize`,
    tokenEndpoint: `${STRAVA_URL}/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}`,
  },
};
