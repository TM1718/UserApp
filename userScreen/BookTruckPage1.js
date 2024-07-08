import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const BookTruckPage1 = () => {
  const navigation = useNavigation();
  const [goodsName, setGoodsName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
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

  const handleDateChange = (event, selectedDate, dateSetter) => {
    setShowPicker(null); // Hide the picker after selection

    if (event.type === 'set' && selectedDate) {
      dateSetter(selectedDate);
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
      <TouchableOpacity onPress={() => setShowPicker('fromDate')} style={[styles.input, errors.fromDate && styles.inputError]}>
        <Text>{fromDate ? fromDate.toLocaleDateString() : '--'}</Text>
      </TouchableOpacity>
      {showPicker === 'fromDate' && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, setFromDate)}
        />
      )}

      <Text style={styles.label}>To Date:</Text>
      <TouchableOpacity onPress={() => setShowPicker('toDate')} style={[styles.input, errors.toDate && styles.inputError]}>
        <Text>{toDate ? toDate.toLocaleDateString() : '--'}</Text>
      </TouchableOpacity>
      {showPicker === 'toDate' && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, setToDate)}
        />
      )}

      <Text style={styles.label}>From Time:</Text>
      <TouchableOpacity onPress={() => setShowPicker('fromTime')} style={[styles.input, errors.fromTime && styles.inputError]}>
        <Text>{fromTime ? fromTime.toLocaleTimeString() : '--'}</Text>
      </TouchableOpacity>
      {showPicker === 'fromTime' && (
        <DateTimePicker
          value={fromTime}
          mode="time"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, setFromTime)}
        />
      )}

      <Text style={styles.label}>To Time:</Text>
      <TouchableOpacity onPress={() => setShowPicker('toTime')} style={[styles.input, errors.toTime && styles.inputError]}>
        <Text>{toTime ? toTime.toLocaleTimeString() : '--'}</Text>
      </TouchableOpacity>
      {showPicker === 'toTime' && (
        <DateTimePicker
          value={toTime}
          mode="time"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, setToTime)}
        />
      )}

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