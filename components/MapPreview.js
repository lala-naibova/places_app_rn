import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native'

import ENV from '../env'

const MapPreview = (props) => {
    let imagePreviewurl;
    if (props.location) {
        imagePreviewurl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;     
    }
    
    return (
        <TouchableOpacity onPress={props.onPress}
        style={{...styles.mapPreview, ...props.style}}>
            {props.location? 
            <Image style={styles.image}
            source={{uri:imagePreviewurl}}/> : 
            props.children}     
        </TouchableOpacity>
    );
}
const styles= StyleSheet.create({
    mapPreview:{
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        width:'100%',
        height:'100%'
    }
})
export default MapPreview;
