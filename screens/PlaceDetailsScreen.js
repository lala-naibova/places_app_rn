import React from 'react'
import {View, Text, ScrollView,Image, StyleSheet,Alert} from 'react-native'
import {useSelector} from 'react-redux'

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors'


export default function PlaceDetailScreen(props) {
    const placeID = props.navigation.getParam('placeId');
    const currPlace = useSelector(state=> state.places.places.find(pl=> pl.id===placeID));
    const currPlaceLocation = {lat: currPlace.lat, lng: currPlace.lng}
    const showMapHandler = ()=>{
        props.navigation.navigate('Map',{readonly: true, initialLocation : currPlaceLocation})
    }
    
    return (
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <Image style={styles.image}
                source={{uri : currPlace.imageUri}}/>
            
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{currPlace.address}</Text>
                </View> 
                <MapPreview 
                onPress={showMapHandler}
                style={styles.mapPreview}
                location={currPlaceLocation}/>
            </View>
        </ScrollView>
    )
}
PlaceDetailScreen.navigationOptions = navData=>{
    const title = navData.navigation.getParam('title');
    return{
        headerTitle: title,
    }
}

const styles = StyleSheet.create({
    image: {
      height: '45%',
      minHeight: 300,
      width: '95%',
      backgroundColor: '#ccc',
      padding:5,
      borderRadius:10,
      marginTop:4
    },
    locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10,
      overflow:'hidden'
    },
    addressContainer: {
      padding: 20
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 290,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    
  });
  