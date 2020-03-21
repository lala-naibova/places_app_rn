import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import {combineReducers, createStore, applyMiddleware} from 'redux'

import placeReducer from './store/place-reducer'
import PlacesNavigation from './navigation/PlaceNavigation'
import {init} from './helpers/db';

init().then(()=>{
  console.log('successful');
  
}).catch((err)=>{
  console.log('error: ',err);
  
})

const rootReducer = combineReducers({
  places: placeReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <PlacesNavigation/>
    </Provider>

  );
}