import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface LoginButtonComponentProps {
  onButtonPress: any;
}

export const LoginButton = ({onButtonPress}: LoginButtonComponentProps) => {
  return (
    <TouchableOpacity onPress={onButtonPress} style={styles.buttonStyle}>
      <Text style={styles.buttonText}>Strava Auth</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#161616',
    borderRadius: 4,
    padding: 16,
  },
  buttonText: {
    color: '#FFF',
  },
});
