import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, Alert } from 'react-native';
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

    // Handle form submission logic here (navigation example)
     navigation.navigate('BookTruckPage2', {
     goodsName,
     vehicleCount,
     fromDate,
     toDate,
     fromTime,
     toTime,
    });
    // Alert.alert('Submission', 'Form data is valid');
  };

  const openDateTimePicker = async (stateSetter, mode) => {
    try {
      const { action, year, month, day, hour, minute } = await DateTimePicker.open({
        value: stateSetter === setFromDate ? fromDate : stateSetter === setToDate ? toDate : stateSetter === setFromTime ? fromTime : toTime,
        mode: mode,
        is24Hour: true,
      });
      if (action !== DateTimePicker.dismissedAction) {
        const selectedDate = new Date(year, month, day, hour, minute);
        stateSetter(selectedDate);
      }
    } catch ({ message }) {
      console.warn('Cannot open datetime picker', message);
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
      <TouchableOpacity onPress={() => openDateTimePicker(setFromDate, 'date')} style={[styles.input, errors.fromDate && styles.inputError]}>
        <Text>{fromDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Date:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setToDate, 'date')} style={[styles.input, errors.toDate && styles.inputError]}>
        <Text>{toDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>From Time:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setFromTime, 'time')} style={[styles.input, errors.fromTime && styles.inputError]}>
        <Text>{fromTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To Time:</Text>
      <TouchableOpacity onPress={() => openDateTimePicker(setToTime, 'time')} style={[styles.input, errors.toTime && styles.inputError]}>
        <Text>{toTime.toLocaleTimeString()}</Text>
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
