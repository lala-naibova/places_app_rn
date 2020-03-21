import React,{useState, useEffect} from 'react';
import {View, Button, Text, Alert, ActivityIndicator, StyleSheet} from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import MapPreview from './MapPreview'

const LocationPicker = (props) => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    const {onLocationPicked} = props;
    useEffect(()=>{
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    },[mapPickedLocation, onLocationPicked]);

    const verifyPermission = async ()=>{
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions!','You need to grand location permissions to use this app.',
            [{text:'Okay'}]);
            return false;
        }
        return true;
    }
    const getLocationHandler =  async ()=>{
        const result = await verifyPermission();
        if (!result) {
            return;
        }
        try {
            setIsFetching(true);
            const currPos = await Location.getCurrentPositionAsync({timeout : 5000});

            setPickedLocation({
                lat: currPos.coords.latitude,
                lng : currPos.coords.longitude
            });
            onLocationPicked({
                lat: currPos.coords.latitude,
                lng : currPos.coords.longitude
            });

        } catch (error) {
            Alert.alert('Could not fetch the location',
            'Please try again or pick location on the map.',
            [{text:'Okay'}])
        }
        setIsFetching(false);
    }
  const pickOnMapHandler= ()=>{
    props.navigation.navigate('Map')
  }
    return (
        <View style={styles.locationPicker}>
            <MapPreview 
            onPress={pickOnMapHandler}
            style={styles.mapPreview}
            location={pickedLocation}>
                {isFetching ? 
                (<ActivityIndicator size='large' color={Colors.primary}/>):
                (<Text>No location chosen yet!</Text>)}
            </MapPreview>
            <View style={styles.action}>
                <Button 
                color={Colors.primary}
                title='get user location'
                onPress={getLocationHandler}/>

                <Button 
                color={Colors.primary}
                title='pick on map'
                onPress={pickOnMapHandler}/>
            </View>
            
        </View>
    );
}
const styles= StyleSheet.create({
locationPicker:{
    marginBottom:15,
    
},
mapPreview:{
    marginBottom:10,
    width:'100%',
    height:150,
    borderColor:'#ccc',
    borderWidth:1,
},
action:{
flexDirection:'row',
justifyContent:'space-around'
}
})

export default LocationPicker;
