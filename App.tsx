/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigator';



export default function App() {
  return (
    <Provider store={store}>

      <RootNavigator />

    </Provider>
  );
}


