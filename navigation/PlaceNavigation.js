import {Platform} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import MapScreen from '../screens/MapScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen'

import Colors from '../constants/Colors'

const PlaceNavigation = createStackNavigator({
    Places : PlacesListScreen,
    PlaceDetail : PlaceDetailsScreen,
    NewPlace : NewPlaceScreen,
    Map : MapScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor : Platform.OS === 'android'? Colors.primary : ''
        },
        headerTintColor : Platform.OS === 'android'? 'white' : Colors.primary
    }
});

export default createAppContainer(PlaceNavigation)
