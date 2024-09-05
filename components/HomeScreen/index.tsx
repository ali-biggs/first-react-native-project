import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {STRAVA_CONFIG} from '../../utils/STRAVA_CONFIG';
import {authorize} from 'react-native-app-auth';
import {useAthleteStravaStore} from '../../store';
import {LoginButton} from '../LoginButton';
import {ActivitySummary} from '../ActivitySummary';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'HomeScreen'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const {accessToken, setStravaId, setAccessToken, initialLoad, activities} =
    useAthleteStravaStore((state: any) => state);

  const onPressStravaAuth = useCallback(async () => {
    const result: any = await authorize(STRAVA_CONFIG);

    if (result) {
      setAccessToken(result.accessToken);
      setStravaId(result.tokenAdditionalParameters.athlete.id);
      setLoginSuccess(true);
    }
  }, [setStravaId, setAccessToken]);

  useEffect(() => {
    setLoading(true);
    initialLoad(accessToken).finally(() => {
      setLoading(false);
    });
  }, [loginSuccess, initialLoad, accessToken]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContainerContent}>
      <View style={styles.mainView}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f2870a"
            style={styles.spinner}
          />
        ) : !loginSuccess ? (
          <View style={styles.buttonContainer}>
            <LoginButton onButtonPress={onPressStravaAuth} />
          </View>
        ) : Array.isArray(activities) ? (
          activities.map((activity: any) => (
            <ActivitySummary
              key={activity.id}
              activity={activity}
              onPress={() => navigation.navigate('ActivityScreen', {activity})}
            />
          ))
        ) : (
          <Text>No activities available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContainerContent: {
    flexGrow: 1,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
