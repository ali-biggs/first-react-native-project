import React from 'react';
import DeviceInfo from 'react-native-device-info';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './components/HomeScreen';
import {ActivityScreen} from './components/ActivityScreen';

const App = () => {
  console.log('\n');
  console.log(`${DeviceInfo.getBundleId()}://oauth`);
  console.log('\n');

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Strava Activites'}}
        />
        <Stack.Screen
          name="ActivityScreen"
          component={ActivityScreen}
          options={{title: 'Activity Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
