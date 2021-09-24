import React, {useState, useRef} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'firebase';



export default function Login({updateScreen}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailRef = useRef();
    const passwordRef = useRef();

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
     // var user = userCredential.user;
      updateScreen(email)
      // ...
    })
    .catch((error) => {
        resetForm(); 
      //var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });

  }

  function resetForm(){
   
    emailRef.current.setNativeProps({text: ""});
    passwordRef.current.setNativeProps({text: ""});
  }

    return (
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(e) => setEmail(e)}
        ref={emailRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
        ref={passwordRef}
        secureTextEntry = 'true'
      />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style = {styles.text}>Connexion</Text>
        </TouchableOpacity>      
            
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E2D98F"
    },
    input:{
      width: "90%",
      height: 50,
      borderWidth: 1,
      marginTop: 20,
      paddingLeft: 25,
      borderRadius: 5
    },
    button:{
      width: "50%",
      height: 50,
      backgroundColor: "#fca311",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 3,
      marginTop: 20
    },
    text:{
      fontSize: 20
    }
  })