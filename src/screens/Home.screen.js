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
          if (res.rows.length === 0) {
            // txn.executeSql('DROP TABLE IF EXISTS Trip_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Trip_Table(id INTEGER PRIMARY KEY AUTOINCREMENT, trip_name TEXT, trip_destination TEXT, trip_date TEXT, trip_assessment TEXT, description TEXT)',
              [],
            );
          }
        },
      );
    });
    // Alert.alert('SQLite Database and Table Successfully Created...');
  };

  const [flatListItems, setFlatListItems] = useState([]);

  const getAllTrip = async () => {
    (await db).transaction(function (tx) {
      tx.executeSql('SELECT * FROM Trip_Table', [], (tx, results) => {
        let payload = [];
        for (let i = 0; i < results.rows.length; ++i) {
          payload.push(results.rows.item(i));
        }
        setFlatListItems(payload);
      });
    });
  };

  const listTripItem = item => {
    return (
      <TouchableOpacity
        style={styles.tripItem}
        activeOpacity={0.6}
        onPress={() => {
          props.navigation.navigate('UpDateTripScreen', {
            tripId: item.id,
            nameTripItem: item.trip_name,
            destinationTripItem: item.trip_destination,
            dateTripItem: item.trip_date,
            assessment: item.trip_assessment,
            descriptionTripItem: item.description,
          });
        }}>
        <View style={styles.tripItemContent} key={item.user_id}>
          <View style={styles.tripIdArea}>
            <Text style={styles.tripId}>{item.id}</Text>
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

  const renderEmpTyData = () => {
    return (
      <View>
        <View style={styles.tripNodataView}>
          <Image
            style={styles.tripNodata}
            source={require('../Public/image/data.png')}
          />
        </View>
        <Text style={styles.label}>No Data</Text>
      </View>
    );
  };

  const deleteAllTrip = async () => {
    const query = 'drop table Trip_Table';

    Alert.alert('DELETE FOREVER', 'You want to delete all Trip ???', [
      {
        text: 'Yes',
        onPress: () => setFlatListItems([]),
      },
      {
        text: 'No',
        onPress: () => props.navigation.navigate('HomeScreen'),
        style: 'No',
      },
    ]);
    await db.executeSql(query);
  };

  useEffect(() => {
    createTable();
    getAllTrip();
    const focusHandler = props.navigation.addListener('focus', () => {
      getAllTrip();
    });
    return focusHandler;
  }, [props]);

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
            <TouchableWithoutFeedback onPress={deleteAllTrip}>
              <View style={styles.tripDeleteImageView}>
                <Image
                  style={styles.tripDeleteImage}
                  source={require('../Public/image/deleteAll.png')}
                />
              </View>
            </TouchableWithoutFeedback>
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
            {flatListItems.length > 0 ? renderTripItem() : renderEmpTyData()}
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
  tripNodataView: {
    flex: 1,
    width: 260,
    height: 60,
    marginLeft: 68,
    marginTop: 120,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tripNodata: {
    width: 80,
    height: 80,
    alignItems: 'center',
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
  tripDeleteImageView: {
    width: 48,
    height: 32,
    marginLeft: 16,
    position: 'absolute',
    left: 0,
  },
  tripDeleteImage: {
    width: 24,
    height: 32,
    marginTop: 12,
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
  label: {
    marginTop: 88,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default HomeScreen;
