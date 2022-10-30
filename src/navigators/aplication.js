import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home.screen';
import AddTripScreen from '../screens/AddTrip.screen';
import UpDateTripScreen from '../screens/UpdateTrip.screen';

const Stack = createStackNavigator();

const stackScreens = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
  },
  {
    name: 'AddTripScreen',
    component: AddTripScreen,
  },
  {
    name: 'UpDateTripScreen',
    component: UpDateTripScreen,
  },
];

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {stackScreens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={{
              animationEnabled: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
