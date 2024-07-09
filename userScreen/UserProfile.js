import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        const response = await fetch(`http://192.168.122.105:3000/api/users/${userId}`);
        const data = await response.json();
        setUsername(data.username);
        setPhoneNumber(data.phoneNumber);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png' }} style={styles.profileImage} />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.sampleText}>{username}</Text>
          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.sampleText}>{phoneNumber}</Text>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('UserLogin')}>
          <Icon name="sign-out" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHomePage')}>
          <Icon name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserInbox')}>
          <Icon name="inbox" size={24} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
          <Icon name="user" size={24} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sampleText: {
    fontSize: 14,
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#FF7878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editProfileText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  navItem: {  
    alignItems: 'center',
  },
});

export default UserProfile;
