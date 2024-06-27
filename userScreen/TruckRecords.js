import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TruckRecords = ({ navigation }) => {
  const isEmpty = true; // Assume inbox is empty for now

  return (
    <View style={{ flex: 1 }}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Records</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {isEmpty && (
          <View style={styles.emptyInboxContainer}>
            <Image
              source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-inbox-4790940-3989293.png' }}
              style={styles.emptyInboxImage}
            />
            <Text style={styles.emptyInboxText}>There is no load taken :)</Text>
          </View>
        )}
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

export default TruckRecords;
