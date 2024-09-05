import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  formatDate,
  formatDistance,
  formatTime,
} from '../../utils/stravaDataFormatting';

interface ActivitySummaryProps {
  activity: any;
  onPress: any;
}

export const ActivitySummary = ({activity, onPress}: ActivitySummaryProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={require('../../assets/box-background.png')}
        imageStyle={{borderRadius: 10}}
        style={styles.box}>
        <View style={styles.activityHeader}>
          <View>
            <Text style={styles.activityTitle}>{activity.name}</Text>
            <Text style={styles.label}>{formatDate(activity.start_date)}</Text>
          </View>
          {activity.sport_type === 'Run' && (
            <Text style={styles.emoji}>🏃‍♂️</Text>
          )}
        </View>

        <View style={styles.dataContainer}>
          <View style={styles.dataPoint}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>
              {formatDistance(activity.distance)}km
            </Text>
          </View>
          <View style={styles.dataPoint}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>
              {formatTime(activity.elapsed_time)}
            </Text>
          </View>
          <View style={styles.dataPoint}>
            <Text style={styles.label}>Elevation</Text>
            <Text style={styles.value}>{activity.total_elevation_gain}m</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  box: {
    width: 400,
    height: 120,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  activityTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 400,
    padding: 10,
  },
  dataPoint: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 14,
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emoji: {
    fontSize: 35,
  },
});
