import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';

export default function Chat({route}){
  const [message, setMessage] = useState('');
  const [messageListe, setMessageListe] = useState([]);
  const messageRef = useRef();

  const transmiter = route.params.emiter;
  const recepter = route.params.receiver;

  useEffect(() => {
    getMessagelist();
  }, [])

  const getMessagelist = () => {
    const db = firebase.firestore();
    // db.collection("messages").where("emitter", "==", transmiter)
    // .get()
    // .then((querySnapshot) => {
    //   const messageTab = Array();
    //   querySnapshot.forEach((doc) => {
    //     // console.log(doc.id, " => ", doc.data());
    //     messageTab.push(doc.data());
    //   });
    //   setMessageListe(messageTab);
    // })
    // .catch((error) => {
    //   console.log("Error getting documents: ", error);
    // });

    db.collection("messages").orderBy('date').get()
    .then((querySnapshot) => {
      const messageTab = Array();
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        messageTab.push(doc.data());
      });
      setMessageListe(messageTab);
      // console.log(messageTab);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection("messages").doc().set({
      emitter: transmiter,
      receiver: recepter,
      message: message,
      date: new Date(),
    })
    .then(() => {
      // console.log("Document successfully written!");
      getMessagelist();
      messageRef.current.setNativeProps({text: ""});
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  return(
    <View style={styles.container}>
      <View style={styles.top}>
        {
          messageListe.map(message => {
            {
              if(message.emitter == transmiter){
                return(
                  <View style={styles.left}>
                    <Text>{message.message}</Text>
                    <Text>
                      {new Date(message.date * 1000).getHours()} H
                      {new Date(message.date * 1000).getMinutes()} min
                    </Text>
                    {/* <Text>{new Date(message.date * 1000).getMinutes()}</Text> */}
                  </View>
                )
              }else if(message.emitter == recepter){
                return(
                  <View style={styles.right}>
                    <Text>{message.message}</Text>
                    {new Date(message.date * 1000).getHours()} H
                      {new Date(message.date * 1000).getMinutes()} min
                    {/* <Text>{new Date(message.date * 1000).getMinutes()}</Text> */}
                  </View>
                )
              }else{
                return <Text></Text>
              }
            }
          })
        }
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder="votre message"
          ref={messageRef}
          onChangeText={e => setMessage(e)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
// tableauObjets.sort(function compare(a, b) {
//   if (a.nom < b.nom)
//   return -1;
//   if (a.nom > b.nom )
//   return 1;
//   return 0;
//   }); 
const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
  },
  top:{
    flex: 22,
    width: "100%"
  },
  bottom:{
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  input:{
    height: 50,
    width: "100%",
    borderWidth:1,
    paddingLeft: 10
  },
  button:{
    height: 30,
    width: "20%",
    backgroundColor: "orange",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  left: {
    height: 30,
    backgroundColor: "red",
    width: "50%",
    borderRadius: 15,
    marginTop: 15,
    marginLeft: "35%",
    justifyContent: "center",
    alignItems: "center"
  },
  right: {
    height: 30,
    backgroundColor: "green",
    width: "50%",
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center"
  }
})