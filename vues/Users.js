import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      <Text>Users list</Text>
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
          <Text>{user.name}</Text>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({

})