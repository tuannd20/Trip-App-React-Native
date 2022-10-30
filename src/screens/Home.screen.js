import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import COLORS from '../constant/color';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'TripDatabase.db'});

const HomeScreen = props => {
  const createTable = async () => {
    (await db).transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Trip_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            // txn.executeSql('DROP TABLE IF EXISTS Trip_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Trip_Table(id INTEGER PRIMARY KEY AUTOINCREMENT, trip_name TEXT, trip_destination TEXT, trip_date TEXT, trip_assessment TEXT, description TEXT)',
              [],
            );
          }
        },
      );
    });
    Alert.alert('SQLite Database and Table Successfully Created...');
  };

  const [flatListItems, setFlatListItems] = useState([]);

  const getAllTrip = async () => {
    (await db).transaction(function (tx) {
      tx.executeSql('SELECT * FROM Trip_Table', [], (tx, results) => {
        let payload = [];
        for (let i = 0; i < results.rows.length; ++i)
          payload.push(results.rows.item(i));
        setFlatListItems(payload);
      });
    });
  };

  const listTripItem = item => {
    return (
      <TouchableOpacity style={styles.tripItem} activeOpacity={0.6}>
        <View style={styles.tripItemContent} key={item.user_id}>
          <View style={styles.tripIdArea}>
            <Text style={styles.tripId}>{item.trip_id}</Text>
          </View>
          <View style={styles.tripNameArea}>
            <Text style={styles.tripContentFirst}>{item.trip_name}</Text>
            <Text style={styles.tripContentSecond}>
              {item.trip_destination}
            </Text>
          </View>
          <View style={styles.tripDateArea}>
            <Text style={styles.tripContentFirst}>{item.trip_date}</Text>
            <Text style={styles.tripContentSecond}>{item.trip_assessment}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTripItem = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={flatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listTripItem(item)}
      />
    );
  };

  useEffect(() => {
    createTable();
    getAllTrip();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <SafeAreaView style={{backgroundColor: COLORS.white}}>
        <View style={styles.container}>
          <View style={styles.tripHeader}>
            <Text style={styles.tripHeaderText}>List of Trip</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate('AddTripScreen');
              }}>
              <View style={styles.tripHeaderImage}>
                <Image source={require('../Public/image/add.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{padding: 10, marginTop: 10, flex: 1}}>
            {renderTripItem()}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    height: 800,
    backgroundColor: COLORS.white,
    textAlign: 'center',
  },
  tripHeader: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.grey,
  },
  tripHeaderText: {
    marginTop: 12,
    color: COLORS.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tripHeaderImage: {
    width: 48,
    height: 46,
    marginTop: 20,
    position: 'absolute',
    right: 0,
  },
  tripItem: {
    marginTop: 18,
    height: 80,
    backgroundColor: COLORS.item,
    borderRadius: 15,
  },
  tripItemContent: {
    marginTop: 14,
    marginLeft: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tripIdArea: {
    width: 18,
    height: 60,
  },
  tripId: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
  },
  tripNameArea: {
    marginLeft: 12,
    width: 158,
    height: 60,
  },
  tripContentFirst: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  tripDateArea: {
    marginLeft: 12,
    width: 158,
    height: 60,
  },
  tripContentSecond: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default HomeScreen;
