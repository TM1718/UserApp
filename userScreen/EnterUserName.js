import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const EnterUserName = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.122.105:3000/api/users/login', {
                phoneNumber,
                password,
            });
            console.log(response.data);

            if (response.data.success) {
                navigation.navigate('UserHomePage');
                alert('Welcome!');
            } else {
                alert('Invalid phone number or password');
            }
        } catch (error) {
            console.log(error);
            alert('Error logging in');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.buttonCover}
            >
                <Image
                    source={{
                        uri: "https://icons.veryicon.com/png/o/miscellaneous/official-icon-of-flying-pig/return-to-arrow-details-page.png",
                    }}
                    style={styles.image}
                />
            </TouchableOpacity>

            <View style={styles.ParentCon}>
                <View style={styles.buttonCover3}>
                    <Text style={styles.para3}>Phone Number</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Enter your phone number</Text>
                </View>

                <View style={styles.buttInp}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "baseline",
        margin: 10,
        justifyContent: "flex-start",
    },
    buttonCover: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        top: 50,
        left: 10,
    },
    image: {
        width: 30,
        height: 30,
    },
    ParentCon: {
        marginTop: 160,
        margin: 10,
    },
    para3: {
        fontSize: 22,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15,
        marginTop: 10,
        color: "#424040",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 4,
        padding: 10,
        width: width - 40,
        height: 60,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 10,
    },
    buttInp: {
        marginTop: 40,
    },
    button: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        width: width - 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EnterUserName;
