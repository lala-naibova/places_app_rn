import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert,Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useDispatch} from 'react-redux'

import Colors from '../constants/Colors';
import * as placeActions from '../store/place-action'

const PlaceItem = props => {
  const dispatch = useDispatch()
  const deletePlaceHandler = (placeID)=>{
    Alert.alert('Warning!','Dou you really want to delete this place?',
    [{text:'Yes',onPress:()=>{
       dispatch(placeActions.delete_place(placeID));
    }},{text:'No'}])
}

  return (
    <TouchableOpacity 
    onPress={props.onSelect} 
    style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.info}>
        <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
      <View style={styles.icon} >
        <Ionicons onPress={()=>{props.onDelete(props.id)}} 
        name={Platform.OS==='android'?'md-cut':'ios-cut'}
        size={20}
        color={Colors.primary}
        onPress={()=>deletePlaceHandler(props.id)}/>
      </View>
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  info:{
    flexDirection:"row",
    alignItems:'center'
  }
});

export default PlaceItem;