import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//custom imports
import reducer from './combineReducers';

const persistConfig = {
  key: 'root',
  timeout: 0,
  storage: AsyncStorage,
  whitelist: ['Login'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);
export {store, persistor};
