import React from 'react';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOutfitScreen from '../screens/AddOutfitScreen';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="Tabs" component={TabNavigator}/>
            <Stack.Screen name="AddOutfit" component={AddOutfitScreen}/>
        </Stack.Navigator>
    );
};

export default RootNavigator;
