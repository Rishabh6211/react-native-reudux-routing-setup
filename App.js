/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import configureStore from './src/store/setup'
import {CounterContainer} from './src/containers/'
import RouterComponent from './src/config/routes'
import {network} from './src/utilities'

const store = configureStore();

const App = () => {
  network()
  return (
    <Provider store={store}>
   
      <StatusBar barStyle="dark-content" />
     
      <RouterComponent/> 
      
    
    </Provider>
  );
};



export default App;
