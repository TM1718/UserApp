import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const TruckRecords = ({ navigation }) => {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        const response = await fetch(`http://192.168.122.105:3000/api/userRequests?userId=${userId}`);
        const data = await response.json();
        setUserRequests(data);
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will format the date as YYYY-MM-DD
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Goods Name: <Text style={styles.insideItem}>{item.goodsName}</Text></Text>
      <Text style={styles.itemText}>Vehicle Count:<Text style={styles.insideItem}>{item.vehicleCount}</Text> </Text>
      <Text style={styles.itemText}>From Date:<Text style={styles.insideItem}>{formatDateString(item.fromDate)}</Text> </Text>
      <Text style={styles.itemText}>To Date:<Text style={styles.insideItem}>{formatDateString(item.toDate)}</Text> </Text>
      <Text style={styles.itemText}>From Time:<Text style={styles.insideItem}> {item.fromTime}</Text></Text>
      <Text style={styles.itemText}>To Time:<Text style={styles.insideItem}>{item.toTime}</Text> </Text>
      <Text style={styles.itemText}>Company:<Text style={styles.insideItem}>{item.company}</Text> </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Records</Text>
      </View>

      <View style={styles.content}>
        {userRequests.length === 0 ? (
          <View style={styles.emptyInboxContainer}>
            <Image
              source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-inbox-4790940-3989293.png' }}
              style={styles.emptyInboxImage}
            />
            <Text style={styles.emptyInboxText}>There are no records available.</Text>
          </View>
        ) : (
          <FlatList
            data={userRequests}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>

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
  },
  emptyInboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyInboxImage: {
    width: 250,
    height: 250,
  },
  emptyInboxText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: width * 0.9,
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  insideItem: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF6347',
  },
});

export default TruckRecords;
