import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import DatePicker from 'react-datepicker'; // Import DatePicker from react-datepicker for web
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for react-datepicker
import { useNavigation } from '@react-navigation/native';

const BookTruckPage1 = () => {
  const navigation = useNavigation();
  const [goodsName, setGoodsName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [fromDate, setFromDate] = useState(null); // Change initial state to null for react-datepicker
  const [toDate, setToDate] = useState(null); // Change initial state to null for react-datepicker
  const [fromTime, setFromTime] = useState(null); // Change initial state to null for react-datepicker
  const [toTime, setToTime] = useState(null); // Change initial state to null for react-datepicker
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(null); // State to manage which picker to show

  const validateFields = () => {
    const errors = {};
    if (!goodsName.trim()) errors.goodsName = true;
    if (!vehicleCount.trim()) errors.vehicleCount = true;
    if (!fromDate) errors.fromDate = true;
    if (!toDate) errors.toDate = true;
    if (!fromTime) errors.fromTime = true;
    if (!toTime) errors.toTime = true;

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    navigation.navigate('BookTruckPage2', {
      goodsName,
      vehicleCount,
      fromDate,
      toDate,
      fromTime,
      toTime,
    });
  };

  const openDateTimePicker = (stateSetter, mode) => {
    setShowPicker(mode); // Set the mode to show the correct picker
  };

  const handleDateChange = (selectedDate) => {
    setShowPicker(null); // Hide the picker after selection

    if (selectedDate) {
      if (showPicker === 'date') {
        if (selectedDate >= toDate) {
          Alert.alert('Invalid Date', 'From date must be before To date.');
        } else if (selectedDate < new Date()) {
          Alert.alert('Invalid Date', 'Please select a future date.');
        } else {
          setFromDate(selectedDate);
        }
      } else if (showPicker === 'toDate') {
        if (selectedDate <= fromDate) {
          Alert.alert('Invalid Date', 'To date must be after From date.');
        } else if (selectedDate < new Date()) {
          Alert.alert('Invalid Date', 'Please select a future date.');
        } else {
          setToDate(selectedDate);
        }
      } else if (showPicker === 'time') {
        // Directly set the time without checking future time
        setFromTime(selectedDate);
      } else if (showPicker === 'toTime') {
        // Directly set the time without checking future time
        setToTime(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goods Type:</Text>
      <TextInput
        style={[styles.input, errors.goodsName && styles.inputError]}
        value={goodsName}
        onChangeText={setGoodsName}
        placeholder="Enter goods name"
      />

      <Text style={styles.label}>Vehicle Count:</Text>
      <TextInput
        style={[styles.input, errors.vehicleCount && styles.inputError]}
        value={vehicleCount}
        onChangeText={setVehicleCount}
        placeholder="Enter vehicle count"
        keyboardType="numeric"
      />

      <Text style={styles.label}>From Date:</Text>
      {showPicker === 'date' && (
        <DatePicker
          selected={fromDate}
          onChange={date => handleDateChange(date)}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
          placeholderText="Select date"
          className="datepicker"
        />
      )}
      <TouchableOpacity onPress={() => openDateTimePicker(setFromDate, 'date')} style={[styles.input, errors.fromDate && styles.inputError]}>
        <Text>{fromDate ? fromDate.toLocaleDateString() : '--'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Date:</Text>
      {showPicker === 'toDate' && (
        <DatePicker
          selected={toDate}
          onChange={date => handleDateChange(date)}
          dateFormat="MM/dd/yyyy"
          minDate={fromDate || new Date()}
          placeholderText="Select date"
          className="datepicker"
        />
      )}
      <TouchableOpacity onPress={() => openDateTimePicker(setToDate, 'toDate')} style={[styles.input, errors.toDate && styles.inputError]}>
        <Text>{toDate ? toDate.toLocaleDateString() : '--'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>From Time:</Text>
      {showPicker === 'time' && (
        <DatePicker
          selected={fromTime}
          onChange={date => handleDateChange(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          placeholderText="Select time"
          className="datepicker"
        />
      )}
      <TouchableOpacity onPress={() => openDateTimePicker(setFromTime, 'time')} style={[styles.input, errors.fromTime && styles.inputError]}>
        <Text>{fromTime ? fromTime.toLocaleTimeString() : '--'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Time:</Text>
      {showPicker === 'toTime' && (
        <DatePicker
          selected={toTime}
          onChange={date => handleDateChange(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          placeholderText="Select time"
          className="datepicker"
        />
      )}
      <TouchableOpacity onPress={() => openDateTimePicker(setToTime, 'toTime')} style={[styles.input, errors.toTime && styles.inputError]}>
        <Text>{toTime ? toTime.toLocaleTimeString() : '--'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BookTruckPage1;