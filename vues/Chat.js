import React from 'react'
import {View, Text} from 'react-native'

export default function Chat({route}) {

    console.log(route.params.emitter);
    console.log(route.params.receiver);
    const transmitter = route.params.emitter; 
    const recepter = route.params.receiver; 
    return (
        <View>
            <Text>Emmitteur: {transmitter}</Text>
            <Text>Recepteur: {recepter}</Text>
        </View>
        
    )
}

