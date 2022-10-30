/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import HomeScreen from './src/screens/Home.screen';
import ApplicationNavigator from './src/navigators/aplication';

const App = () => {
  return <ApplicationNavigator />;
};

export default App;
