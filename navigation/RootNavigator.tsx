import React from 'react';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOutfitScreen from '../screens/AddOutfitScreen';
import DesignRoomScreen from '../screens/DesignRoomScreen';
import NewOutfitScreen from '../screens/NewOutfitScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    const isAuthenticated = false;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="Tabs" component={TabNavigator}/>
                    <Stack.Screen name="AddOutfit" component={AddOutfitScreen}/>
                    <Stack.Screen name="DesignRoom" component={DesignRoomScreen}/>
                    <Stack.Screen name="NewOutfit" component={NewOutfitScreen}/>
                </>
            ) : (
                <>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="SignIn" component={SignInScreen}/>
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
