import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const _doSignIn = async (email, password) => {
    let success;

    try {
      setIsLoading(true);
      let response = await auth().signInWithEmailAndPassword(email, password);

      if (response && response.user) {
        success = true;
      }
    } catch (error) {
      success = false;

      console.log(error);
    } finally {
      setIsLoading(false);
    }

    return { success }
  }

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const successLogin = await _doSignIn(email.value, password.value);

    if (successLogin.success) {
      navigation.navigate('Dashboard');
    } else {
      // TODO: check for error messages
      Alert.alert('Algo deu errado!', 'Não foi possível fazer login.')
    }
  };

  // TODO: add formik
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Login</Header>

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

      <View style={styles.forgotPassword}>
        <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed} isLoading={isLoading}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
