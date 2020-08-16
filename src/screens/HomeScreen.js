import React, { memo, useState, useEffect } from 'react';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Template React Native App</Header>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
            </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Cadastro
          </Button>
    </Background >
  );
};

export default memo(HomeScreen);
