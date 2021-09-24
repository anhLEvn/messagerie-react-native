import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

export default function Chat({ route }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const messageRef = useRef()

  console.log(route.params.emitter)
  console.log(route.params.receiver)
  const transmitter = route.params.emitter
  const recepter = route.params.receiver


  useEffect (() => {
    getMessageList()

  }, [])

  const db = firebase.firestore(); 

  const getMessageList = () => {
    db.collection("messages").where("emitter", "==", transmitter && "receiver", '==' , recepter)
    .get()
    .then((querySnapshot) => {
        const messageTab = Array(); 
        querySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            messageTab.push(doc.data()); //
        });
        setMessageList(messageTab); 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  }
  const handleSubmit = () => {
    // Add a new document in collection "cities"
    
    db.collection('messages')
      .doc()
      .set({
        emitter: transmitter,
        receiver:recepter,
        message: message,
        date: new Date(),
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }
  return (
    <View>
      <View style={styles.top}>
      
        <Text>Ici les messages</Text>
        {
            messageList.map((message) =>(
            
            <Text>{message.message}</Text>
          ))
        }
        
        <TextInput
          style={styles.input}
          placeholder="Votre message"
          ref={messageRef}
          onChangeText={(e) => setMessage(e)}
        />
      </View>
      <View style={styles.top}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>

      <Text>Emmitteur: {transmitter}</Text>
      <Text>Recepteur: {recepter}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  top: {
    flex: 22,
    width: '100%',
  },
  bottom: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    height: 30,
    width: '20%',
    backgroundColor: 'orange',
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
