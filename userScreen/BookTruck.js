import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';


const { width, height } = Dimensions.get('window');
const BookTruck = () => {
  const [goodsName, setGoodsName] = React.useState('');
  const [vehicleCount, setVehicleCount] = React.useState('');
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [fromTime, setFromTime] = React.useState(new Date());
  const [toTime, setToTime] = React.useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = React.useState(false);
  const [showToDatePicker, setShowToDatePicker] = React.useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = React.useState(false);
  const [showToTimePicker, setShowToTimePicker] = React.useState(false);

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatePicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const handleFromTimeChange = (event, selectedTime) => {
    setShowFromTimePicker(false);
    if (selectedTime) {
      setFromTime(selectedTime);
    }
  };

  const handleToTimeChange = (event, selectedTime) => {
    setShowToTimePicker(false);
    if (selectedTime) {
      setToTime(selectedTime);
    }
  };

  return (
    <ScrollView style={styles.Scrollcontainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Fill in for the best Transport Service!</Text>
        
        <Text style={styles.label}>Goods type</Text>
        <TextInput
          style={styles.input}
          value={goodsName}
          onChangeText={setGoodsName}
          placeholder="Enter goods name"
        />
        
        <Text style={styles.label}>Vehicle Count</Text>
        <TextInput
          style={styles.input}
          value={vehicleCount}
          onChangeText={setVehicleCount}
          placeholder="Enter vehicle count"
          keyboardType="numeric"
        />

        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeField}>
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.input}>
              <Text>{fromDate.toDateString()}</Text>
              <Icon name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={handleFromDateChange}
              />
            )}
          </View>

          <View style={styles.dateTimeField}>
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.input}>
              <Text>{toDate.toDateString()}</Text>
              <Icon name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {showToDatePicker && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={handleToDateChange}
              />
            )}
          </View>

          <View style={styles.dateTimeField}>
            <Text style={styles.label}>From Time</Text>
            <TouchableOpacity onPress={() => setShowFromTimePicker(true)} style={styles.input}>
              <Text>{fromTime.toTimeString().split(' ')[0]}</Text>
              <Icon name="clock-o" size={24} color="black" />
            </TouchableOpacity>
            {showFromTimePicker && (
              <DateTimePicker
                value={fromTime}
                mode="time"
                display="default"
                onChange={handleFromTimeChange}
              />
            )}
          </View>

          <View style={styles.dateTimeField}>
            <Text style={styles.label}>To Time</Text>
            <TouchableOpacity onPress={() => setShowToTimePicker(true)} style={styles.input}>
              <Text>{toTime.toTimeString().split(' ')[0]}</Text>
              <Icon name="clock-o" size={24} color="black" />
            </TouchableOpacity>
            {showToTimePicker && (
              <DateTimePicker
                value={toTime}
                mode="time"
                display="default"
                onChange={handleToTimeChange}
              />
            )}
          </View>
        </View>

        <Text style={styles.label}>Select Company</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'ABC Company', value: 'abc' },
            { label: 'XYZ Company', value: 'xyz' },
            { label: 'DEF Company', value: 'def' },
            // Add more options here
          ]}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Select a company...',
            value: null,
          }}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Scrollcontainer:{
    marginTop: 30,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeField: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  dateTimeContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  button:{
    backgroundColor: '#FF6347',
    borderRadius: 10,
    width: width - 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
});

export default BookTruck;
