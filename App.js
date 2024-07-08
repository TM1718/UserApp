import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseCat from './screens/ChooseCat';
import Login from './userScreen/Login';
import Otp from './userScreen/Otp';
import EnterUserName from './userScreen/EnterUserName';
import UserHomePage from './userScreen/UserHomePage';
import BookTruckPage1 from './userScreen/BookTruckPage1';
import UserInbox from './userScreen/UserInbox';
import TruckRecords from './userScreen/TruckRecords';
import UserProfile from './userScreen/UserProfile';
import AiPage from './userScreen/AiPage';
import Testing from './userScreen/Testing';
import BookTruckPage2 from './userScreen/BookTruckPage2';
import EditUserRequest from './userScreen/EditUserRequest';

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
        <Stack.Screen name='BookTruckPage1' component={BookTruckPage1} />
        <Stack.Screen name='BookTruckPage2' component={BookTruckPage2} />
        <Stack.Screen name='UserInbox' component={UserInbox} />
        <Stack.Screen name='TruckRecords' component={TruckRecords} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='AiPage' component={AiPage}/>
        <Stack.Screen name='Testing' component={Testing}/>
        <Stack.Screen name='EditUserRequest' component={EditUserRequest}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
