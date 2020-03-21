import React,{useState, useCallback} from 'react';
import {useDispatch} from 'react-redux'
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native'

import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'
import Colors from '../constants/Colors';
import * as placeActions from '../store/place-action'

export default function NewPlaceScreen(props) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [selectedLocation, setSelectedLocation]= useState()
    const textChangeHandler =(txt)=>{
        //add validation
        setTitle(txt);
    }
    const saveDataHandler = ()=>{
        dispatch(placeActions.addPlace(title, imageUri, selectedLocation));      
        props.navigation.goBack();
    }
    const onImageTakenHandler= (uri)=>{
        setImageUri(uri);
    }
    const onLocationTakenHandler = useCallback(
        (loc)=>{
            setSelectedLocation(loc);
        },
        [],
    )
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.input}
                value={title}
                onChangeText={textChangeHandler}/>
                <ImagePicker onImageTaken={onImageTakenHandler}/>
                <LocationPicker 
                navigation={props.navigation}
                onLocationPicked ={onLocationTakenHandler}/>
                <View style={styles.action}>
                    <Button 
                    color={Colors.primary} 
                    title='save data'
                    onPress={saveDataHandler}/>
                </View>
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = navData=>{
    return {
        headerTitle:'Add place',
    }
}

const styles= StyleSheet.create({
    screen:{
        margin:20
    },
    label:{
        fontSize:18,
        marginBottom:15
    },
    input:{
        marginBottom:15,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        fontSize:15,
        paddingHorizontal:4,
        paddingVertical:2
    }
})