import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

// Custom Imports
import {screenNames} from '../utils';

// Screen Imports
import {Login, Dashboard} from '../modules';

export default function App() {
  const {loginCredentials} = useSelector((state: {Login: any}) => ({
    loginCredentials: state.Login.loginCredentials,
  }));
  const Stack = createNativeStackNavigator();

  const isEmpty = (obj: object) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        {isEmpty(loginCredentials) ? (
          <Stack.Screen name={screenNames.LOGIN} component={Login} />
        ) : (
          <Stack.Screen name={screenNames.DASHBOARD} component={Dashboard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
