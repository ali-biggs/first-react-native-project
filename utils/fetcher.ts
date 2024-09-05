//Would normally store this in an env.local file but unsure of how to do this in a react native project
const STRAVA_PUBLIC_URL = 'https://www.strava.com/api/v3';

export const getStravaActivitiesList = async (accessToken: string) => {
  try {
    const response = await fetch(`${STRAVA_PUBLIC_URL}/athlete/activities`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error retreiving list of activities: ', error);
    return error;
  }
};

export const getActivityStreams = async (
  accessToken: string,
  activityId: number,
) => {
  try {
    const response = await fetch(
      `${STRAVA_PUBLIC_URL}/activities/${activityId}/streams?keys=heartrate,cadence,altitude,velocity_smooth&key_by_type=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error retreiving list of activities: ', error);
    return error;
  }
};
