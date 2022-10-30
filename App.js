/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {Store} from './src/services/store';
import {Provider as PaperProvider} from 'react-native-paper';
import ApplicationNavigator from './src/navigators/aplication';

const App = () => {
  return <ApplicationNavigator />;
};

export default App;
