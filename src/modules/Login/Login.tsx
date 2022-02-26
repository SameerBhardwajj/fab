import React, {useRef, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';

// Custom Imports
import {colors} from '../../utils';
import {CustomInput, CustomButton} from '../../components';
import {getLogin} from './actions';

export interface AppProps {
  navigation?: any;
}

export default function Login(props: AppProps) {
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const passwordRef = useRef();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function storeUserSession() {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          password: password,
        }),
      );
      dispatch(
        getLogin(
          {
            username: userName,
          },
          () => {},
        ),
      );
    } catch (error) {
      // There was an error on the native side
    }
  }

  return (
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps={'handled'}
      style={Styles.mainView}
      contentContainerStyle={Styles.mainContainerView}>
      <KeyboardAvoidingView style={Styles.innerView} behavior={'height'}>
        <CustomInput
          ref={userNameRef}
          label={'Username'}
          value={userName}
          onChangeText={(txt: string) => {
            setUserName(txt);
          }}
        />
        <CustomInput
          ref={passwordRef}
          label={'Password'}
          value={password}
          password
          onChangeText={(txt: string) => {
            setPassword(txt);
          }}
        />
        <CustomButton
          label="login"
          icon="login"
          onPress={() => storeUserSession()}
          disabled={userName.length === 0 || password.length === 0}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
  },
  mainContainerView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
