import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookTruckPage2 = () => {
  const [company, setCompany] = useState(null);
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { goodsName, vehicleCount, fromDate, toDate, fromTime, toTime } = route.params;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://192.168.122.105:3000/api/companies');
      console.log('API Response:', response.data); // Debugging line
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!company) errors.company = true;
    if (!fromPlace) errors.fromPlace = true;
    if (!toPlace) errors.toPlace = true;

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const username = await AsyncStorage.getItem('username');
      const userPhoneNumber = await AsyncStorage.getItem('phoneNumber');

      const response = await axios.post('http://192.168.122.105:3000/api/userRequests', {
        userId,
        username,
        phoneNumber: userPhoneNumber,
        goodsName,
        vehicleCount,
        fromDate,
        toDate,
        fromTime,
        toTime,
        company,
        fromPlace,
        toPlace,
      });

      setLoading(false);
      Alert.alert('Success', 'Truck booking request submitted successfully.');
      navigation.navigate('UserHomePage'); // Assuming 'Home' is the main screen
    } catch (error) {
      setLoading(false);
      console.error('Error submitting booking request:', error);
      Alert.alert('Error', 'Failed to submit booking request. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>Select Company</Text>
        {companies.length > 0 ? (
          <RNPickerSelect
            onValueChange={(value) => setCompany(value)}
            items={companies.map((company) => ({ label: company.name, value: company.name }))}
            style={{
              inputIOS: [styles.input, errors.company && styles.inputError],
              inputAndroid: [styles.input, errors.company && styles.inputError],
            }}
            placeholder={{ label: 'Select a company', value: null }}
          />
        ) : (
          <ActivityIndicator size="large" color="#FF6347" />
        )}

        <Text style={styles.label}>From Place</Text>
        <TextInput
          style={[styles.input, errors.fromPlace && styles.inputError]}
          value={fromPlace}
          onChangeText={setFromPlace}
          placeholder="Enter from place"
        />

        <Text style={styles.label}>To Place</Text>
        <TextInput
          style={[styles.input, errors.toPlace && styles.inputError]}
          value={toPlace}
          onChangeText={setToPlace}
          placeholder="Enter to place"
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BookTruckPage2;
