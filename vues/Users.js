import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Chat from './Chat'
import Liste from './Liste'

import firebase from 'firebase'

const Stack = createNativeStackNavigator(); 
export default function Users({user}) { //(props)
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //  // console.log(user);
  //   getUserListe();
  // },[])

  // const getUserListe = () => {
  //   const db = firebase.firestore();
  //   db.collection("users").get()
  //   .then((querySnapshot) => {
  //     const userstab = Array();
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       // console.log(doc.id, " => ", doc.data());
  //       //userstab.push(doc.data());
  //       const user = {
  //         id: doc.id,
  //         data: doc.data(),
  //       }
  //       userstab.push(user);

  //     });
  //     const newuserstab = userstab.filter(item => item.id != user);
  //     console.log(newuserstab);

  //     setUsers(newuserstab);
  //     //setUsers(userstab);
  //   });
  // }

  const returnListeScreen = () => {
    return <Liste user={user}>User Connected</Liste> // props.user = {user}
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Liste">
          {returnListeScreen}
        </Stack.Screen> */}
        
        <Stack.Screen name="Liste" component={Liste} initialParams ={{itemId:user}} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Stack.Navigator></Stack.Navigator>
    //   {/* <Text style={styles.text}>Users list</Text> */}
    //   {/* {
    //     avec la mathode map au moment de definir la fonction flechee si on utilise des acolades apres la fleche il faut mettre un return
    //     si on utilise des parentheses on ne met pas le return
    //     users.map((user) => {
    //       return(
    //         <Text>{user.name}</Text>
    //       )
    //     })
    //   } */}
    //   {
    //     users.map((user) => (
    //       <TouchableOpacity key = {user.id} style = {styles.user}>
    //       <Text style={styles.text}>{user.data.name}</Text>
    //       </TouchableOpacity>
    //     ))
    //   }
    // </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor:'#E2D98F'
//   },
//   user: {
//     height: 50,
//     width: "95%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     backgroundColor: 'nickel-light',
//     borderWidth: 1,
//     paddingLeft: 25,
//     paddingRight: 25,
//     borderRadius: 5

//   },
//   text: {
//     fontSize:  20,
//   }

//})
