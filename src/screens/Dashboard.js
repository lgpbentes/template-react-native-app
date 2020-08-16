import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Welcome</Header>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Paragraph>
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
);

export default memo(Dashboard);
