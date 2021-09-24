
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';


const Stack = createNativeStackNavigator(); 

export default function Liste({route, navigation}) {

    const [users, setUsers] = useState([]);
    console.log(route.params.itemId);
    const user1 = route.params.itemId; 

    useEffect(() => {
     // console.log(user);
     //console.log(navigation);
      getUserListe();
    },[])
  
    const getUserListe = () => {
      const db = firebase.firestore();
      db.collection("users").get()
      .then((querySnapshot) => {
        const userstab = Array();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          //userstab.push(doc.data());
          const user = {
            id: doc.id, 
            data: doc.data(),
          }
          userstab.push(user);
          
        });
        const newuserstab = userstab.filter(item => item.id != user1);
        console.log(newuserstab);
    
        setUsers(newuserstab);
        //setUsers(userstab);
      });
    }
  
    return(
      <View style={styles.container}>
      <Text style={styles.text}>User connected</Text>
        {/* <Text style={styles.text}>Users list</Text> */}
        {/* {
          avec la mathode map au moment de definir la fonction flechee si on utilise des acolades apres la fleche il faut mettre un return
          si on utilise des parentheses on ne met pas le return 
          users.map((user) => {
            return(
              <Text>{user.name}</Text>
            )
          })
        } */}
        {
          users.map((user) => (
            
            <TouchableOpacity 
            key = {user.id} 
            style = {styles.user}
            onPress = {() => navigation.navigate("Chat", {emitter: user1, receiver: user.id})}>
            <Text style={styles.text}>{user.data.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%', 
      backgroundColor:'#E2D98F'
    },
    user: {
      height: 50, 
      width: "95%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10, 
      backgroundColor: 'nickel-light',
      borderWidth: 1,
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 5
  
    },
    text: {
      fontSize:  20,
      textAlign: 'center'
    }
  
  })