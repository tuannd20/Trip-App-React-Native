import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import COLORS from '../constant/color';

const AddTripScreen = () => {
  return (
    <View>
      <Text>Add new trip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    height: 800,
    backgroundColor: COLORS.white,
    textAlign: 'center',
  },
});

export default AddTripScreen;
