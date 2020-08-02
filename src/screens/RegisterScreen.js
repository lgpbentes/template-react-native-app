import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const _doCreateUser = async (email, password, name) => {
    let success;

    try {
      setIsLoading(true);
      let response = await auth().createUserWithEmailAndPassword(email, password);
      if (response && auth().currentUser) {
        const newUserInfo = {
          displayName: name,
        }

        await auth().currentUser.updateProfile(newUserInfo);        

        success = true;
      }
    } catch (error) {
      success = false;

      if (error.code === 'auth/email-already-in-use') {
        setEmail({ ...email, error: 'O endereço de e-mail já está em uso' });
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setEmail({ ...email, error: 'O endereço de email é inválido' });
      }

      if (error.code === 'auth/weak-password') {
        setPassword({ ...password, error: 'Senha inválida. A senha deve conter pelo menos 6 caracteres' });
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    return { success }
  }


  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const successLogin = await _doCreateUser(email.value, password.value, name.value);

    if (successLogin.success) {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Criar conta</Header>

      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button} isLoading={isLoading}>
        Cadastrar
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
