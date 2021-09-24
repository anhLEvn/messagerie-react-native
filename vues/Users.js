import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default function Users(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
        userstab.push(doc.data());
      });
      setUsers(userstab);
    });
  }

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Users list</Text>
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
          <TouchableOpacity key = {user.pseudo} style = {styles.user}>
          <Text>{user.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100, 
  },
  user: {
    height: 50, 
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10, 
    backgroundColor: '#E2D98F',
  },
  text: {
    fontSize:  20,
  }

})