import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'TripDatabase.db'});

const createTrip = (
  nameTrip,
  destination,
  text,
  textAssessment,
  description,
) => {
  let data;
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO Trip_Table (trip_name, trip_destination, trip_date, trip_assessment, description) VALUES (?,?,?,?,?)',
      [nameTrip, destination, text, textAssessment, description],
      (tx, results) => {
        return (data = results.rowsAffected);
      },
    );
  });
  console.log('data', data);
  return data;
};

export default createTrip;
