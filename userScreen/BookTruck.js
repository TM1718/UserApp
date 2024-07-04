import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Example: Using AsyncStorage for user data storage

const { width, height } = Dimensions.get('window');

const BookTruck = () => {
  const [goodsName, setGoodsName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData(); // Fetch user data when component mounts
  }, []);
  
  const fetchUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUsername = await AsyncStorage.getItem('username');
  
      if (storedUserId && storedUsername) {
        setUserId(storedUserId);
        setUsername(storedUsername);
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  const handleSubmit = async () => {
    if (!userId || !username) {
      Alert.alert('Error', 'User ID or username is missing.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.122.105:3000/api/userRequests', {
        userId,
        username,
        goodsName,
        vehicleCount: parseInt(vehicleCount),
        fromDate,
        toDate,
        fromTime: fromTime.toLocaleTimeString().split(' ')[0],
        toTime: toTime.toLocaleTimeString().split(' ')[0],
        company: 'selected_company_here', // Replace with actual selected company
      });
  
      console.log(response.data);
      Alert.alert('Success', 'Truck booking request submitted successfully!');
      navigation.goBack(); // Navigate back after successful submission
    } catch (error) {
      console.error('Error submitting request:', error);
      Alert.alert('Error', 'Failed to submit truck booking request. Please try again later.');
    }
  };
  

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
              <Text>{fromTime.toLocaleTimeString().split(' ')[0]}</Text>
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
              <Text>{toTime.toLocaleTimeString().split(' ')[0]}</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
