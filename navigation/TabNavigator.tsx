import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#D3D3D3',
            tabBarStyle: {
                backgroundColor: '#fff',
                height: 70,
                borderTopWidth: 0,
                elevation: 0,
            }
        }}>
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }: { color: string, size: number }) => (
                    <Ionicons name="home" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="add" component={View} options={{
                tabBarIcon: ({ color, size }: { color: string, size: number }) => (
                    <View className="w-12 h-12 items-center justify-center rounded-full bg-black">
                        <Text className="text-white text-[28px] leading-[28px]">+</Text>
                    </View>
                ),
                tabBarButton: (props: any) => (
                    <TouchableOpacity {...props} className="items-center justify-center" />
                )
            }} />
            <Tab.Screen name="person" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }: { color: string, size: number }) => (
                    <Ionicons name="person" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
