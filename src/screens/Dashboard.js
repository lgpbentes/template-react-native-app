import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const Dashboard = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <Background>
    <Logo />
    {/* <Header>Welcome</Header>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Paragraph> */}
    <Paragraph>
      Welcome, {user.email}!
          </Paragraph>
    <Button
      mode="outlined"
      onPress={() => { navigation.navigate('SurveyScreen') }}>
      Questionário
          </Button>
    <Button
      mode="outlined"
      onPress={() => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        navigation.navigate('HomeScreen');
      }}>
      Sair
          </Button>
  </Background>
};

export default memo(Dashboard);
