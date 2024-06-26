import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Otp = () => {
    const navigation = useNavigation();
    const inputs = useRef([]);

    const focusInput = (index) => {
        inputs.current[index].focus();
    };

    const handleTextInput = (text, index) => {
        // Move to the next input field when a digit is entered
        if (text.length === 1 && index < inputs.current.length - 1) {
            focusInput(index + 1);
        }
        // Move to the previous input field when a digit is erased
        else if (text.length === 0 && index > 0) {
            focusInput(index - 1);
        }
    };

    const renderInputs = () => {
        const otpInputs = [];
        for (let i = 0; i < 5; i++) {
            otpInputs.push(
                <TextInput
                    key={i}
                    ref={(input) => (inputs.current[i] = input)}
                    style={styles.otpInput}
                    placeholder="-"
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(text) => handleTextInput(text, i)}
                />
            );
        }
        return otpInputs;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonCover} onPress={() => navigation.goBack()}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios/50/000000/back.png" }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.appName}>App name</Text>
            </View>

            {/* Enter OTP */}
            <View style={styles.center}>
                <Text style={styles.enterOtp}>Enter OTP</Text>
                <Text style={styles.sentOtp}>We have sent OTP on your number</Text>

                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                    {renderInputs()}
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnterUserName')}>
                    <Text style={styles.buttonText}>VERIFY OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        width: 30,
        height: 30,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enterOtp: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    sentOtp: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: 50,
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    button: {
        backgroundColor: '#FF6347',
        borderRadius: 10,
        width: width - 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height-410,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonCover: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
});

export default Otp;
