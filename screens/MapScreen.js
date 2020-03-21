import React, { useState, useEffect, useCallback } from 'react';
import {Text, StyleSheet , TouchableOpacity, Platform, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors'

const MapScreen = props => {
  const readonly = props.navigation.getParam('readonly')
  const initialLocation = props.navigation.getParam('initialLocation');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation? initialLocation.lat : 40.409264,
    longitude: initialLocation? initialLocation.lng : 49.867092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return {};
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };
const savePickedLoactionHandler = useCallback(() =>{
    if (!selectedLocation) {
        Alert.alert('Sorry!','Choose place before save',[{text:'ok'}]);
        return;
    }
    props.navigation.navigate('NewPlace',{pickedLocation : selectedLocation})
},[selectedLocation])

    useEffect(()=>{
        props.navigation.setParams({saveLocation : savePickedLoactionHandler})
    },[savePickedLoactionHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData =>{
    const saveFn  = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly')
    return {
        headerRight : ()=>{
            if (readonly) {
              return;
            }
            return (
                <TouchableOpacity style={styles.headerButton}
                onPress={saveFn}>
                    <Text style={styles.headerText}>Save</Text>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton:{
      marginHorizontal :20  
  },
  headerText:{
      fontSize:16,
      color: Platform.OS === 'android'? 'white': Colors.primary
  }
});

export default MapScreen;
