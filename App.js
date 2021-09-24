import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'firebase'; 
import Register from './vues/Register'
import Users from './vues/Users'



const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
    <Tab.Navigator>
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Users" component={Users} />
      </Tab.Navigator>     
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E2D98F',
//     alignItems: 'center',
//     justifyContent: 'center',
// //   },
// });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoeUM4TrKadjSDBsZRpn1xle7WzAThlo4",
  authDomain: "messagerie-8bd33.firebaseapp.com",
  projectId: "messagerie-8bd33",
  storageBucket: "messagerie-8bd33.appspot.com",
  messagingSenderId: "1038767747799",
  appId: "1:1038767747799:web:a70ea2de98a82b58a63692"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
