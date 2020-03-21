import React, {useEffect} from 'react'
import {View, Text, Platform, FlatList, Alert} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from 'react-redux'

import CustomButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem'
import * as placeActions from '../store/place-action'

export default function PlacesListScreen(props) {
    const places = useSelector(state=>state.places.places);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(placeActions.loadPlaces());
    },[dispatch])
    
    
    return (
        <FlatList
        data={places}
        renderItem={(itemData)=>(
        <PlaceItem 
        key={itemData.item.id}
        id={itemData.item.id}
        title={itemData.item.title}
        image= {itemData.item.imageUri}
        address={itemData.item.address}
        onSelect={()=>{
            props.navigation.navigate('PlaceDetail',
            {
                title: itemData.item.title,
                placeId : itemData.item.id,
                imageUri : itemData.item.imageUri
            })
        }}
        />)}/>
    )
}
PlacesListScreen.navigationOptions = navData=>{
    return {
        headerTitle:'All places',
        headerRight : ()=>{
            return(
                <HeaderButtons HeaderButtonComponent={CustomButton}>
                    <Item title='add' iconName={Platform.OS==='android'?'md-add':'ios-add'}
                    onPress={()=>{navData.navigation.navigate('NewPlace')}}/>
                </HeaderButtons>

                
            )
        }
    }
}