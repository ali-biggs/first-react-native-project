import {create} from 'zustand';
import {getStravaActivitiesList} from '../utils/fetcher';

export const useAthleteStravaStore = create(set => ({
  accessToken: '',
  stravaId: null,
  activities: [],
  selectedActivity: {},

  setAccessToken: (accessToken: string) => set({accessToken}),
  setStravaId: (stravaId: number) => set({stravaId}),
  setActivities: (activities: string[]) => set({activities}),
  setSelectedActivity: (selectedActivity: {}) => set({selectedActivity}),

  initialLoad: async (accessToken: string) => {
    try {
      const results = await getStravaActivitiesList(accessToken);

      set({
        activities: results,
      });
    } catch (error) {
      console.error('Error fetching initial data: ', error);
    }
  },
}));
