import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const BookTruckPage1 = () => {
  const navigation = useNavigation();
  const [goodsName, setGoodsName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [fromDate, setFromDate] = useState('--');
  const [toDate, setToDate] = useState('--');
  const [fromTime, setFromTime] = useState('--');
  const [toTime, setToTime] = useState('--');
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(null); // State to manage which picker to show

  const validateFields = () => {
    const errors = {};
    if (!goodsName.trim()) errors.goodsName = true;
    if (!vehicleCount.trim()) errors.vehicleCount = true;
    if (!fromDate || fromDate === '--') errors.fromDate = true;
    if (!toDate || toDate === '--') errors.toDate = true;
    if (!fromTime || fromTime === '--') errors.fromTime = true;
    if (!toTime || toTime === '--') errors.toTime = true;

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

  const handleDateChange = (event, selectedDate) => {
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
  

  // Function to check if selected time is future time
  const isTimeFuture = (selectedTime) => {
    const now = new Date();
    return selectedTime.getHours() > now.getHours() ||
      (selectedTime.getHours() === now.getHours() && selectedTime.getMinutes() > now.getMinutes());
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
      <TouchableOpacity onPress={() => openDateTimePicker(setFromDate, 'date')} style={[styles.input, errors.fromDate && styles.inputError]}>
        <Text>{fromDate === '--' ? fromDate : fromDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Date:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setToDate, 'toDate')} style={[styles.input, errors.toDate && styles.inputError]}>
        <Text>{toDate === '--' ? toDate : toDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>From Time:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setFromTime, 'time')} style={[styles.input, errors.fromTime && styles.inputError]}>
        <Text>{fromTime === '--' ? fromTime : fromTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Time:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setToTime, 'toTime')} style={[styles.input, errors.toTime && styles.inputError]}>
        <Text>{toTime === '--' ? toTime : toTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {showPicker === 'date' && (
        <DateTimePicker
          value={fromDate === '--' ? new Date() : fromDate}
          mode="date"
          is24Hour={true}
          display="default"
          minimumDate={new Date()} // Only allow future dates
          onChange={(event, date) => handleDateChange(event, date)}
        />
      )}

      {showPicker === 'toDate' && (
        <DateTimePicker
          value={toDate === '--' ? new Date() : toDate}
          mode="date"
          is24Hour={true}
          display="default"
          minimumDate={fromDate === '--' ? new Date() : fromDate} // Minimum date is the fromDate
          onChange={(event, date) => handleDateChange(event, date)}
        />
      )}

      {showPicker === 'time' && (
        <DateTimePicker
            value={fromTime === '--' ? new Date() : fromTime}
            mode="time"
            is24Hour={false} // Display time in 12-hour format
            display="default"
            onChange={(event, date) => handleDateChange(event, date)}
        />
        )}

        {showPicker === 'toTime' && (
        <DateTimePicker
            value={toTime === '--' ? new Date() : toTime}
            mode="time"
            is24Hour={false} // Display time in 12-hour format
            display="default"
            minimumDate={fromTime === '--' ? new Date() : fromTime} // Minimum time is the fromTime
            onChange={(event, date) => handleDateChange(event, date)}
        />
        )}

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
