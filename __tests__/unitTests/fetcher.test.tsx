import {getActivityStreams, getStravaActivitiesList} from '../../utils/fetcher';

describe('getStravaactivitiesList', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return data when the fetch is successful', async () => {
    const mockData = [
      {id: 1, name: 'Activity 1'},
      {id: 2, name: 'Activity 2'},
    ];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const accessToken = 'mock-access-token';
    const result = await getStravaActivitiesList(accessToken);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.strava.com/api/v3/athlete/activities',
      expect.objectContaining({
        headers: {Authorization: `Bearer ${accessToken}`},
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should return an error when the fetch fails', async () => {
    const mockError = new Error('Failed to fetch');
    fetch.mockRejectOnce(mockError);

    const accessToken = 'mock-access-token';
    const result = await getStravaActivitiesList(accessToken);

    expect(result).toEqual(mockError);
  });
});

describe('getActivityStreams', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return data when the fetch is successful', async () => {
    const mockData = {heartrate: [], cadence: []};
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const accessToken = 'mock-access-token';
    const activityId = 12345;
    const result = await getActivityStreams(accessToken, activityId);

    expect(fetch).toHaveBeenCalledWith(
      `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=heartrate,cadence,altitude,velocity_smooth&key_by_type=true`,
      expect.objectContaining({
        headers: {Authorization: `Bearer ${accessToken}`},
      }),
    );
    expect(result).toEqual(mockData);
  });

  it('should return an error when the fetch fails', async () => {
    const mockError = new Error('Failed to fetch');
    fetch.mockRejectOnce(mockError);

    const accessToken = 'mock-access-token';
    const activityId = 12345;
    const result = await getActivityStreams(accessToken, activityId);

    expect(result).toEqual(mockError);
  });
});
