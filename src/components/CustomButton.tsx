import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export interface AppProps {
  label: string;
  onPress: Function;
  icon?: string;
  disabled?: boolean;
}

export default function CustomButton(props: AppProps) {
  return (
    <Button
      icon={props.icon}
      mode="contained"
      disabled={props.disabled}
      style={Styles.btnStyle}
      onPress={() => props.onPress()}>
      {props.label}
    </Button>
  );
}

const Styles = StyleSheet.create({
  btnStyle: {
    padding: 10,
    justifyContent: 'center',
    marginVertical: 20,
  },
});
