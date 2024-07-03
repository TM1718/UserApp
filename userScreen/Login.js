import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Login = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://192.168.122.105:3000/api/users', {
            phoneNumber,
            password,
          });
          console.log(response.data);          

          if (response.data.navigate === 'HomeScreen') {
            navigation.navigate('UserHomePage');
            alert('Welcome');            
          } else if (response.data.navigate === 'EnterUsername') {
            navigation.navigate('EnterUserName');
            alert('Thankyou for Registering');
          }
        } catch (error) {
          console.log(error);
          alert('Error adding user');
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
                    <Image source={{ uri: 'https://pngimg.com/uploads/phone_hand/phone_hand_PNG98.png' }} style={styles.image2}/>
                </View>
                <View style={styles.buttonCover3}>
                    <Text style={styles.para3}>Enter your Phone Number</Text>
                </View>
                <View style={styles.buttInp}>
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
                            keyboardType="numeric"
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}

                            value={password}
                            onChangeText={setPassword}
                        />
                        
                    </View>
                    <TouchableOpacity style={styles.buttonCover2} onPress={handleSubmit}>
                        <Text style={styles.text2}>SEND OTP</Text>
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
        width: 250, 
        height: 250, 
        overflow: "hidden", 
        backgroundColor: "#FF8787",
        alignSelf: "center", 
        marginTop: 30,
    },
    image2: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain', 
    },
    text: {
        fontSize: 33,
        color: "#000",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 30,
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
