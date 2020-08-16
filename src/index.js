import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  AuthLoadingScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  SurveyScreen,
} from './screens';

const AppStack = createStackNavigator({
  Dashboard,
  SurveyScreen,
});

const AuthStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    RegisterScreen: {
      screen: RegisterScreen,
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen
    },
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);