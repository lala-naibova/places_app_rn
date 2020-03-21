import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
export const DELETE_PLACE = 'DELETE_PLACE'

import ENV from '../env'

import {insertPlace, fetchPlaces, deletePlace} from '../helpers/db'

export const addPlace = (title, imageUri, location)=>{
    return async dispatch =>{

        const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)
        if (!result) {
            throw new Error('Something went wrong!')
        }
        const resData = await result.json();
        if (!resData.results) {
            throw new Error('Something went wrong!')
        }
        const address = resData.results[0].formatted_address;

        const fileName = imageUri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to:newPath
            });
            const dbresult = await insertPlace(title, newPath, address, location.lat, location.lng);

            dispatch({
                type:ADD_PLACE,
                placeData:{
                    id: dbresult.insertId,
                    title:title,
                    imageUri : newPath,
                    address : address,
                    coords: {
                        lat : location.lat,
                        lng : location.lng
                    }
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
}

export const loadPlaces = ()=>{
    
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
}

export const delete_place = (id) =>{
    return async dispatch => {
        try {
            await deletePlace(id);
            const dbResult = await fetchPlaces();
            dispatch({ type: DELETE_PLACE, places: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
}