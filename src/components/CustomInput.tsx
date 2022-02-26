import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

export interface AppProps {
  password?: boolean;
  value: string;
  label: string;
  onChangeText: Function;
}

const CustomInput = React.forwardRef((props: AppProps, ref: any) => {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      ref={ref}
      label={props.label}
      value={props.value}
      onChangeText={(txt: string) => props.onChangeText(txt)}
      mode={'outlined'}
      secureTextEntry={props.password && !show}
      style={Styles.mainView}
      right={
        props.password ? (
          <TextInput.Icon
            name={show ? 'eye-off' : 'eye'}
            onPress={() => setShow(!show)}
          />
        ) : null
      }
    />
  );
});

const Styles = StyleSheet.create({
  mainView: {
    width: '90%',
    marginVertical: 10,
  },
});

export default CustomInput;
