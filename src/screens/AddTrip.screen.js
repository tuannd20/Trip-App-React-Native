import React, {useState} from 'react';
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
import COLORS from '../constant/color';
import Input from '../components/input.component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm from 'react-native-radio-form';
import {openDatabase} from 'react-native-sqlite-storage';

const mockData = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
];

let db = openDatabase({name: 'TripDatabase.db'});

const AddTripScreen = props => {
  const [dateTrip, setDateTrip] = useState(new Date());
  const [text, setText] = useState('Select date of the trip');
  const [textAssessment, setTextAssessment] = useState('');

  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');

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

  let _onSelect = item => {
    console.log(item);
    setTextAssessment(item.value);
  };
  console.log('vavaavaav', textAssessment);

  const addTrip = () => {
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

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Trip_Table (trip_name, trip_destination, trip_date, trip_assessment, description) VALUES (?,?,?,?,?)',
        [name, destination, text, textAssessment, description],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Create Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Create Failed');
        },
      );
    });
  };

  return (
    <View>
      <View>
        <View style={styles.tripHeader}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('HomeScreen');
            }}>
            <View style={styles.tripHeaderImage}>
              <Image
                style={styles.imageIconBack}
                source={require('../Public/image/back.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.tripHeaderText}>Add Trip</Text>
        </View>
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <Input
            // onChangeText={text => handleOnchange(text, 'email')}
            // onFocus={() => handleError(null, 'email')}
            // iconName="account"
            label="Name"
            placeholder="Enter name of the trip"
            onChangeText={nameInput => setName(nameInput)}
            // error={errors.email}
          />
          <Input
            // onChangeText={text => handleOnchange(text, 'email')}
            // onFocus={() => handleError(null, 'email')}
            label="Destination"
            placeholder="Enter destination of the trip"
            onChangeText={destinationInput => setDestination(destinationInput)}
            // error={errors.email}
          />
          <View style={{flexDirection: 'row', marginBottom: 18}}>
            <View style={{marginTop: 3, marginRight: 10}}>
              <Text style={styles.label}>Assessment: </Text>
            </View>
            <RadioForm
              style={{width: 350 - 30}}
              dataSource={mockData}
              itemShowKey="label"
              itemRealKey="value"
              circleSize={16}
              initial={1}
              formHorizontal={true}
              labelHorizontal={true}
              onPress={item => _onSelect(item)}
            />
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
            // onChangeText={text => handleOnchange(text, 'email')}
            // onFocus={() => handleError(null, 'email')}
            // iconName="account"
            label="Description"
            placeholder="Enter description of the trip"
            onChangeText={descriptionInput => setDescription(descriptionInput)}
            // error={errors.email}
          />
        </View>
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={addTrip}
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
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default AddTripScreen;
