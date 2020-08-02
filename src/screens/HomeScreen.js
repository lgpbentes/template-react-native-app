import React, { memo, useState, useEffect } from 'react';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import auth from '@react-native-firebase/auth';


const HomeScreen = ({ navigation }) => {
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

  return (
    <Background>
      <Logo />
      <Header>Template React Native App</Header>

      {!user
        ? <>
          <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            Login
            </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Cadastro
          </Button>
        </>
        : <>
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
            }}>
            Sair
          </Button>
        </>
      }
    </Background >
  );
};

export default memo(HomeScreen);
