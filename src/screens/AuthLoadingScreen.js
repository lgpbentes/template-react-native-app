import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthLoadingScreen = ({ navigation }) => {
  const onAuthStateChanged = (user) => {
    // TODO: add user to dispatch

    navigation.navigate(user ? 'App' : 'Auth');
  }

  useEffect(() => {
    // bootstrap async
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
