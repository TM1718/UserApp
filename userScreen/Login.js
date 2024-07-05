import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.122.105:3000/api/users/register', {
                username,
                phoneNumber,
                password,
            });
            console.log(response.data);

            if (response.data.success) {
                await AsyncStorage.setItem('userId', response.data.userId);
                await AsyncStorage.setItem('username', response.data.username);
                if (response.data.phoneNumber) {
                    await AsyncStorage.setItem('phoneNumber', response.data.phoneNumber);
                }
                navigation.navigate('UserHomePage');
                Alert.alert('Success', 'Thank you for registering!');
            } else {
                Alert.alert('Error', 'Error registering user');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error registering user');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View>
                    <TouchableOpacity style={styles.buttonCover} onPress={() => navigation.goBack()}>
                        <Image source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/official-icon-of-flying-pig/return-to-arrow-details-page.png' }} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>Continue With Phone</Text>
                    <Text style={styles.para}>We will send an <Text style={styles.spanText}>One Time Password</Text> to your phone</Text>
                </View>
                <View style={styles.imageCon}>
                    <Image  source={require('../assets/Login-bro.png')} style={styles.image2}/>
                </View>
                <View style={styles.buttonCover3}>
                    <Text style={styles.para3}>Enter your Phone Number and Name</Text>
                </View>
                <View style={styles.buttInp}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="  eg: John Doe"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="eg: 1234567890"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonCover2} onPress={handleSubmit}>
                        <Text style={styles.text2}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCover4} onPress={() => navigation.navigate('EnterUserName')}>
                        <Text style={styles.text5}>Login ?</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonCover: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20,
        marginTop: 0,
    },
    image: {
        width: 30,
        height: 30,
    },
    imageCon: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 125, 
        width: 200, 
        height: 200, 
        overflow: "hidden", 
        backgroundColor: "#fff",
        alignSelf: "center", 
        marginTop: 30,
    },
    image2: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', 
    },
    text: {
        fontSize: 33,
        color: "#000",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 30,
    },
    text5:{
        color: "red",
        fontWeight: "bold",
    },
    para: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        marginHorizontal: 30,
        marginTop: 10,
    },
    spanText:{
        fontSize: 17,
        color: "#444",
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonCover3: {
        borderRadius: 10,
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20,
    },
    buttonCover4:{
        borderRadius: 10,
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 10,
    },
    para2: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 0,
    },
    para3:{
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginHorizontal: 25,
        marginTop: 10,
        marginBottom: 0,
        fontWeight: "bold",
    },
    buttInp:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonCover2:{
        backgroundColor: "#FF6347",
        borderRadius: 10,
        width: width-50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: height-720,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    input: {
        height: 40,
        width: 300,
        borderBottomWidth: 0,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text2: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default Login;
