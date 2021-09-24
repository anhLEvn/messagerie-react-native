import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';

export default function Register(){
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const pseudoRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection("users").doc(pseudo).set({
      pseudo: pseudo,
      name: name,
      phone: phone
    })
    .then(() => {
      resetForm();
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  function resetForm(){
    pseudoRef.current.setNativeProps({text: ""});
    nameRef.current.setNativeProps({text: ""});
    phoneRef.current.setNativeProps({text: ""});
  }

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        onChangeText={(e) => setPseudo(e)}
        ref={pseudoRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(e) => setName(e)}
        ref={nameRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(e) => setPhone(e)}
        ref={phoneRef}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    flex: 1,
    backgroundColor: '#E2D98F',
    alignItems: "center",
    justifyContent: "center",
  },
  input:{
    width: "95%",
    height: 50,
    borderWidth:1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
  },
  button:{
    height: 50,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    backgroundColor: "orange"
  }
})