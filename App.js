import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseCat from './screens/ChooseCat';
import Login from './userScreen/Login';
import Otp from './userScreen/Otp';
import EnterUserName from './userScreen/EnterUserName';
import UserHomePage from './userScreen/UserHomePage';
import BookTruck from './userScreen/BookTruck';
import UserInbox from './userScreen/UserInbox';
import TruckRecords from './userScreen/TruckRecords';
import UserProfile from './userScreen/UserProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChooseCat"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ChooseCat" component={ChooseCat} />
        <Stack.Screen name="UserLogin" component={Login} />
        <Stack.Screen name="UserOtp" component={Otp} />
        <Stack.Screen name="EnterUserName" component={EnterUserName} />
        <Stack.Screen name='UserHomePage' component={UserHomePage} />
        <Stack.Screen name='BookTruck' component={BookTruck} />
        <Stack.Screen name='UserInbox' component={UserInbox} />
        <Stack.Screen name='TruckRecords' component={TruckRecords} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
