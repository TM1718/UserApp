import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, SafeAreaView, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MainContent from "./MainContent";
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const UserHomePage = () => {
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const sideNavAnim = useState(new Animated.Value(0))[0];
    const navigation = useNavigation();

    const toggleSideNav = () => {
        setIsSideNavVisible(!isSideNavVisible);
        Animated.spring(sideNavAnim, {
            toValue: isSideNavVisible ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.container}>
                <View style={styles.appBar}>
                    <View style={styles.appBarLeft}>
                        <TouchableOpacity onPress={toggleSideNav} style={styles.appBarLeftItem}>
                            <Text style={styles.menuButton}>☰</Text>
                        </TouchableOpacity>
                        <Image style={styles.appBarProfileIcon} source={{ uri: 'https://toppng.com/uploads/preview/file-svg-profile-icon-vector-11562942678pprjdh47a8.png' }}/>
                    </View> 
                </View>
                <View style={styles.content}>
                    <MainContent />
                </View>
            </SafeAreaView>
            <Animated.View
                style={[
                    styles.sideNav,
                    { transform: [{ translateX: sideNavAnim.interpolate({ inputRange: [0, 1], outputRange: [-250, 0] }) }] },
                ]}
            >
                <View style={styles.navTop}>
                    <Text style={styles.navHead}>Tectzo Transport</Text>
                    <Image style={styles.navImage} source={{ uri: 'https://cdn0.iconfinder.com/data/icons/logistic-icons-rounded/110/Truck-1024.png' }}/>
                </View>
                <View style={styles.navHeader}>
                    <Image source={{ uri: 'https://clipart-library.com/images_k/truck-silhouette-images/truck-silhouette-images-24.png' }} style={styles.truckImage} />
                    <Text style={styles.sampleText}>Welcome User!</Text>
                    <View style={styles.underline} />
                </View>
                <View style={styles.navItems}>
                    <TouchableOpacity style={styles.navButton}>
                        <Icon name="settings-outline" size={20} color="#FFFFFF" style={styles.navIcon} />
                        <Text style={styles.navButtonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Icon name="log-out-outline" size={20} color="#FFFFFF" style={styles.navIcon} />
                        <Text style={styles.navButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Icon name="help-circle-outline" size={20} color="#FFFFFF" style={styles.navIcon} />
                        <Text style={styles.navButtonText}>Help</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNavigationBar}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Icon name="home-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.bottomNavText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Icon name="mail-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.bottomNavText}>Inbox</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        marginBottom: 50,
    },
    appBar: {
        height: 100,
        width: '100%',
        backgroundColor: "#FF7878",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    appBarLeft: {
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between',
    },
    appBarLeftItem: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: 'center',
    },
    appBarProfileIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 20,
    },
    navImage: {
        height: 40,
        width: 40,
    },
    menuButton: {
        marginTop: 20,
        color: "#FFFFFF",
        fontSize: 30,
        marginRight: 20,
    },
    sideNav: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 250,
        backgroundColor: "#FF7878",
        padding: 20,
        height: "100%",
        justifyContent: "flex-start",
        borderBottomRightRadius: 10,
        zIndex: 2,
    },
    navHeader: {
        alignItems: "center",
        marginBottom: 20,
    },
    truckImage: {
        width: 150,
        height: 150,
        marginTop: 60,
        marginBottom: 10,
    },
    sampleText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: "#FFFFFF",
        marginBottom: 20,
    },
    navItems: {
        flex: 1,
    },
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
    },
    navIcon: {
        marginRight: 10,
    },
    navButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    content: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    navHead: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
        marginTop: 0,
    },
    navTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30,
    },
    bottomNavigationBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FF7878",
        height: 60,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomNavItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomNavText: {
        color: "#FFFFFF",
        fontSize: 12,
        marginTop: 4,
    },
});

export default UserHomePage;