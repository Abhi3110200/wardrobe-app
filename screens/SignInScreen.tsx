import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { useAuthStore } from "../store/auth";

const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {login} = useAuthStore();
    const handleSignIn = async()=>{
        if(!email || !password){
            Alert.alert("Error","Please fill all the fields");
            return;
        }
        try {
            await login(email,password);
        } catch (error:any) {
            Alert.alert("Error",error.message);
            console.log(error);
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-white p-4 justify-center">
            <Text className="text-2xl font-bold mb-6 text-center">Sign In</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className="border border-gray-300 p-3 mb-4 rounded-lg text-gray-500"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="border border-gray-300 p-3 mb-4 rounded-lg text-gray-500"
            />
            <TouchableOpacity
                onPress={handleSignIn}
                className="bg-blue-500 p-3 rounded-lg mb-4">
                <Text className="text-white text-lg text-center font-semibold">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-blue-500 text-lg text-center"> Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SignInScreen;