import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import COLORS from '../constant/color';
import Input from '../components/input.component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'TripDatabase.db'});

const UpDateTripScreen = ({route, navigation}) => {
  const {
    tripId,
    nameTripItem,
    descriptionTripItem,
    dateTripItem,
    assessment,
    destinationTripItem,
  } = route.params;
  console.log(
    'update screen',
    tripId,
    nameTripItem,
    descriptionTripItem,
    dateTripItem,
    assessment,
    destinationTripItem,
  );

  const [dateTrip, setDateTrip] = useState(new Date());
  const [text, setText] = useState(dateTripItem);
  const [textAssessment, setTextAssessment] = useState(assessment);
  const [name, setName] = useState(nameTripItem);
  const [destination, setDestination] = useState(destinationTripItem);
  const [description, setDescription] = useState(descriptionTripItem);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let tempDate = new Date(date);
    let formatDate =
      tempDate.getDate() +
      '/' +
      `${tempDate.getMonth() + 1}` +
      '/' +
      tempDate.getFullYear();
    setText(formatDate);
    console.log(text);
    hideDatePicker();
    setDateTrip(date);
  };

  const updateTrip = async () => {
    console.log(name, destination, description, text, textAssessment);

    if (!name) {
      alert('Please fill name');
      return;
    }
    if (!destination) {
      alert('Please fill destination');
      return;
    }
    if (!textAssessment) {
      alert('Please fill assessment');
      return;
    }
    if (!text) {
      alert('Please select date');
      return;
    }

    await db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE Trip_Table set trip_name=?, trip_destination=? , trip_date=?, trip_assessment=? , description=? where id=?',
        [name, destination, text, textAssessment, description, tripId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Update Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Update Failed');
        },
      );
    });
  };

  const deleteTripById = async () => {
    await db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  Trip_Table where id=?',
        [tripId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Trip deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.tripHeader}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <View style={styles.tripHeaderImage}>
              <Image
                style={styles.imageIconBack}
                source={require('../Public/image/back.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.tripHeaderText}>Update Trip</Text>
        </View>
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <Input
            label="Name"
            placeholder="Enter name of the trip"
            onChangeText={nameInput => setName(nameInput)}
            value={name}
          />
          <Input
            label="Destination"
            placeholder="Enter destination of the trip"
            onChangeText={destinationInput => setDestination(destinationInput)}
            value={destination}
          />
          <View style={{flexDirection: 'row', marginBottom: 18}}>
            <View style={{marginTop: 3, marginRight: 10}}>
              <Text style={styles.label}>Assessment: </Text>
            </View>
            <Text style={styles.labelCheck}>Yes: </Text>
            <View style={{marginTop: 4}}>
              <RadioButton
                value="Yes"
                color={COLORS.blue}
                status={textAssessment === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setTextAssessment('Yes')}
              />
            </View>
            <Text style={styles.labelCheck}>No: </Text>
            <View style={{marginTop: 4}}>
              <RadioButton
                value="No"
                color={COLORS.blue}
                status={textAssessment === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setTextAssessment('No')}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 18}}>
            <Text style={styles.label}>Date: </Text>
            <TouchableOpacity
              style={{marginTop: 8, marginLeft: 84}}
              onPress={showDatePicker}>
              <Text>{text}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              date={dateTrip}
              onDateChange={setDateTrip}
              onCancel={hideDatePicker}
            />
          </View>
          <Input
            label="Description"
            placeholder="Enter description of the trip"
            onChangeText={descriptionInput => setDescription(descriptionInput)}
            value={description}
          />
        </View>
        <View style={{marginVertical: 0, paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={updateTrip}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: COLORS.blue,
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 0, paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={deleteTripById}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: COLORS.red,
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
              DELETE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
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
    left: 0,
    marginLeft: 16,
  },

  imageIconBack: {
    width: 12,
    height: 22,
  },

  label: {
    marginVertical: 5,
    fontSize: 18,
    color: COLORS.blue,
  },

  labelCheck: {
    marginVertical: 5,
    fontSize: 18,
    marginTop: 8,
    color: COLORS.blue,
  },
});

export default UpDateTripScreen;
