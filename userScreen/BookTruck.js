import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Image, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookTruck = () => {
    const [goodsName, setGoodsName] = useState('');
    const [vehicleCount, setVehicleCount] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());
    const [company, setCompany] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [showFromTimePicker, setShowFromTimePicker] = useState(false);
    const [showToTimePicker, setShowToTimePicker] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigation = useNavigation();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            const storedUsername = await AsyncStorage.getItem('username');
            const storedUserPhoneNumber = await AsyncStorage.getItem('phoneNumber');

            if (storedUserId && storedUsername && storedUserPhoneNumber) {
                setUserId(storedUserId);
                setUsername(storedUsername);
                setUserPhoneNumber(storedUserPhoneNumber);
            } else {
                console.log('User data not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!goodsName) errors.goodsName = true;
        if (!vehicleCount) errors.vehicleCount = true;
        if (!fromDate) errors.fromDate = true;
        if (!toDate) errors.toDate = true;
        if (!fromTime) errors.fromTime = true;
        if (!toTime) errors.toTime = true;
        if (!company) errors.company = true;

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!userId || !username || !userPhoneNumber) {
            Alert.alert('Error', 'User ID, username, or phone number is missing.');
            return;
        }

        if (!validateFields()) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        try {
            setLoading(true); // Show loading indicator
            const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
            const response = await axios.post('http://192.168.122.105:3000/api/userRequests', {
                userId,
                username,
                userPhoneNumber,
                phoneNumber: storedPhoneNumber,
                goodsName,
                vehicleCount: parseInt(vehicleCount),
                fromDate,
                toDate,
                fromTime: fromTime.toLocaleTimeString().split(' ')[0],
                toTime: toTime.toLocaleTimeString().split(' ')[0],
                company,
            });

            console.log(response.data);
            Alert.alert('Success', 'Truck booking request submitted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting request:', error);
            Alert.alert('Error', 'Failed to submit truck booking request. Please try again later.');
        } finally {
            setLoading(false); // Hide loading indicator
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonCover}>
                    <Image
                        source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/official-icon-of-flying-pig/return-to-arrow-details-page.png" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Book Truck service!</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Goods type</Text>
                <TextInput
                    style={[styles.input, errors.goodsName && styles.inputError]}
                    value={goodsName}
                    onChangeText={setGoodsName}
                    placeholder="Enter goods name"
                />

                <Text style={styles.label}>Vehicle Count</Text>
                <TextInput
                    style={[styles.input, errors.vehicleCount && styles.inputError]}
                    value={vehicleCount}
                    onChangeText={setVehicleCount}
                    placeholder="Enter vehicle count"
                    keyboardType="numeric"
                />

                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeField}>
                        <Text style={styles.label}>From Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowFromDatePicker(true)}
                            style={[styles.input, errors.fromDate && styles.inputError]}
                        >
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
                        <TouchableOpacity
                            onPress={() => setShowToDatePicker(true)}
                            style={[styles.input, errors.toDate && styles.inputError]}
                        >
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
                        <TouchableOpacity
                            onPress={() => setShowFromTimePicker(true)}
                            style={[styles.input, errors.fromTime && styles.inputError]}
                        >
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
                        <TouchableOpacity
                            onPress={() => setShowToTimePicker(true)}
                            style={[styles.input, errors.toTime && styles.inputError]}
                        >
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

                <Text style={styles.label}>Company</Text>
                <RNPickerSelect
                    onValueChange={(value) => setCompany(value)}
                    value={company}
                    placeholder={{ label: 'Select company', value: null }}
                    items={[
                        { label: 'Company 1', value: 'company1' },
                        { label: 'Company 2', value: 'company2' },
                    ]}
                    style={pickerSelectStyles}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                {loading && (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Scrollcontainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#ffffff',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    buttonCover: {
        width: 40,
        height: 40,
        marginTop: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 25,
        height: 25,
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        fontSize: 16,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputError: {
        borderColor: 'red',
    },
    dateTimeContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateTimeField: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#FF6347',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        marginTop: 20,
    },
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
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
});

export default BookTruck;
