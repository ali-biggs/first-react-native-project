import React, {ScrollView, StyleSheet} from 'react-native';
import {useAthleteStravaStore} from '../../store';
import {getActivityStreams} from '../../utils/fetcher';
import {useEffect, useState} from 'react';
import {DataTable} from '../DataTable';

interface StreamData {
  distance: number[];
  cadence?: number[];
  altitude?: number[];
  heartrate?: number[];
  velocity_smooth?: number[];
}

interface LapSummary {
  lapNumber: number;
  lapDistance: number;
  maxCadence?: number;
  minCadence?: number;
  maxElevation?: number;
  minElevation?: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export const ActivityScreen = ({route}: {route: any}) => {
  const activityId = route.params.activity.id;
  const {accessToken} = useAthleteStravaStore((state: any) => state);
  const [streamData, setStreamData] = useState<StreamData | undefined>(
    undefined,
  );
  const [lapSummaries, setLapSummaries] = useState<LapSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivityStreams(accessToken, activityId);
      const dataObject = {
        distance: result.distance.data,
        cadence: result.cadence?.data,
        altitude: result.altitude?.data,
        heartrate: result.heartrate?.data,
        velocity_smooth: result.velocity_smooth?.data,
      };
      setStreamData(dataObject);
    };
    fetchData();
  }, [activityId, accessToken]);

  const calculateLaps = (data: StreamData) => {
    const {distance, cadence, altitude, heartrate, velocity_smooth} = data;

    const laps: LapSummary[] = [];

    let lastLapDistance = 0;
    let lapNumber = 1;
    let currentLap: LapSummary | null = null;

    for (let i = 0; i < distance.length; i++) {
      // Check if we've reached the end of a lap (1km)
      if (distance[i] - lastLapDistance >= 1000) {
        // Save the stats for the completed lap
        if (currentLap) {
          laps.push(currentLap);
        }

        // Initialise a new lap stats object
        currentLap = {
          lapNumber,
          lapDistance: 1,
          maxCadence: cadence ? cadence[i] : undefined,
          maxElevation: altitude ? altitude[i] : undefined,
          minElevation: altitude ? altitude[i] : undefined,

          maxHeartRate: heartrate ? heartrate[i] : undefined,
          minHeartRate: heartrate ? heartrate[i] : undefined,
          maxSpeed: velocity_smooth ? velocity_smooth[i] : undefined,
        };

        lastLapDistance = distance[i];
      } else {
        // Update the current lap stats
        if (currentLap) {
          if (cadence) {
            currentLap.maxCadence = Math.max(
              currentLap.maxCadence ?? cadence[i],
              cadence[i],
            );
            currentLap.minCadence = Math.min(
              currentLap.minCadence ?? cadence[i],
              cadence[i],
            );
          }
          if (altitude) {
            currentLap.maxElevation = Math.max(
              currentLap.maxElevation ?? altitude[i],
              altitude[i],
            );
            currentLap.minElevation = Math.min(
              currentLap.minElevation ?? altitude[i],
              altitude[i],
            );
          }
          if (heartrate) {
            currentLap.maxHeartRate = Math.max(
              currentLap.maxHeartRate ?? heartrate[i],
              heartrate[i],
            );
            currentLap.minHeartRate = Math.min(
              currentLap.minHeartRate ?? heartrate[i],
              heartrate[i],
            );
          }
          if (velocity_smooth) {
            currentLap.maxSpeed = Math.max(
              currentLap.maxSpeed ?? velocity_smooth[i],
              velocity_smooth[i],
            );
            currentLap.minSpeed = Math.min(
              currentLap.minSpeed ?? velocity_smooth[i],
              velocity_smooth[i],
            );
          }
        }
      }
    }

    // Handle the case where the last lap data needs to be added
    if (currentLap) {
      laps.push(currentLap);
    }

    return laps;
  };

  useEffect(() => {
    if (streamData) {
      const data = calculateLaps(streamData);
      setLapSummaries(data);
    }
  }, [streamData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {streamData?.altitude && (
        <DataTable
          data={lapSummaries}
          columns={['Lap', 'Min elevation', 'Max elevation']}
          title="Elevation Data"
        />
      )}

      {streamData?.heartrate && (
        <DataTable
          data={lapSummaries}
          columns={['Lap', 'Min heart rate', 'Max heart rate']}
          title="Heart Rate Data"
        />
      )}

      {streamData?.cadence && (
        <DataTable
          data={lapSummaries}
          columns={['Lap', 'Min cadence', 'Max cadence']}
          title="Cadence Data"
        />
      )}

      {streamData?.velocity_smooth && (
        <DataTable
          data={lapSummaries}
          columns={['Lap', 'Min speed', 'Max speed']}
          title="Speed Data"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
