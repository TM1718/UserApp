import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MainContent = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContent}>
            <Text style={styles.heading}>Manage Your Work Steadly and Efficiently</Text>
            <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate('BookTruck')}>
                <View style={styles.cardContent}>
                    <Image style={styles.cardImage} source={{ uri: 'https://img.freepik.com/free-vector/flat-design-transport-truck-delivery-illustration_23-2149146361.jpg?w=1060&t=st=1719384370~exp=1719384970~hmac=58ca9d8d68895965f9b2113dc638d92f36a710732256d3db779ef300ab2a5b95' }} />
                    <Text style={styles.cardText}>Book Truck</Text>
                </View>
                <View>
                    <Text style={styles.cardPara}>Click here to Book truck for you and for a safe pasage!</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card2}>
                <View style={styles.cardContent}>
                    <Image style={styles.cardImage} source={{ uri: 'https://img.freepik.com/premium-photo/row-folders-papers-documentation-shelf-office_571754-866.jpg?w=360' }} />
                    <Text style={styles.cardText}>Truck Records</Text>
                </View>
                <View>
                    <Text style={styles.cardPara}>Click here to view Records of your booking!</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    heading:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: 'white',
    },
    card1: {
        width: width * 0.9,
        height: height * 0.3,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    card2: {
        width: width * 0.9,
        height: height * 0.3,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    cardContent:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    cardImage:{
        width: width * 0.3,
        height: height * 0.09,
        marginRight: 10,
        marginHorizontal: 10,
    },
    cardPara:{
        fontSize: 13,
        fontWeight: 'bold',
        marginHorizontal: 20,
    }
});

export default MainContent;
