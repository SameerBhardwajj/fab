import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// Custom Imports
import {store, persistor} from './src/store';
import {colors} from './src/utils';
import Router from './src/router';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      background: colors.white,
      primary: colors.violet,
      text: colors.violet,
      accent: colors.violet,
      surface: colors.violet,
      underlineColor: colors.violet,
      backdrop: colors.modalBg,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* @ts-ignore */}
        <PaperProvider theme={theme}>
          <Router />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
