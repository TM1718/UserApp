import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditUserRequest = ({ route, navigation }) => {
  const item = route.params?.item || {};

  const [goodsName, setGoodsName] = useState(item.goodsName || '');
  const [vehicleCount, setVehicleCount] = useState(item.vehicleCount || '');
  const [fromDate, setFromDate] = useState(item.fromDate || '');
  const [toDate, setToDate] = useState(item.toDate || '');
  const [fromTime, setFromTime] = useState(item.fromTime || '');
  const [toTime, setToTime] = useState(item.toTime || '');
  const [company, setCompany] = useState(item.company || '');
  const [fromPlace, setFromPlace] = useState(item.fromPlace || '');
  const [toPlace, setToPlace] = useState(item.toPlace || '');

  const handleSave = async () => {
    try {
      const response = await fetch(`http://192.168.122.105:3000/api/userRequests/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goodsName,
          vehicleCount,
          fromDate,
          toDate,
          fromTime,
          toTime,
          company,
          fromPlace,
          toPlace,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Record updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
      Alert.alert('Error', 'Failed to update record');
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will format the date as YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goods Name</Text>
      <TextInput
        style={styles.input}
        value={goodsName}
        onChangeText={setGoodsName}
      />

      <Text style={styles.label}>Vehicle Count</Text>
      <TextInput
        style={styles.input}
        value={vehicleCount}
        onChangeText={setVehicleCount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>From Date</Text>
      <TextInput
        style={styles.input}
        value={formatDateString(fromDate)}
        onChangeText={setFromDate}
      />

      <Text style={styles.label}>To Date</Text>
      <TextInput
        style={styles.input}
        value={formatDateString(toDate)}
        onChangeText={setToDate}
      />

      <Text style={styles.label}>From Time</Text>
      <TextInput
        style={styles.input}
        value={fromTime}
        onChangeText={setFromTime}
      />

      <Text style={styles.label}>To Time</Text>
      <TextInput
        style={styles.input}
        value={toTime}
        onChangeText={setToTime}
      />

      <Text style={styles.label}>Company</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
      />

      <Text style={styles.label}>From Place</Text>
      <TextInput
        style={styles.input}
        value={fromPlace}
        onChangeText={setFromPlace}
      />

      <Text style={styles.label}>To Place</Text>
      <TextInput
        style={styles.input}
        value={toPlace}
        onChangeText={setToPlace}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditUserRequest;
