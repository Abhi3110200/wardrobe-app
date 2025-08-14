import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/auth";

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const {register} = useAuthStore();

    const handleSignUp = async()=>{
        if(!email || !password || !gender || !username){
            Alert.alert("Error","Please fill all the fields");
            return;
        }
        try {
            await register(email,password,gender,profileImage,username);
        } catch (error: any) {
            Alert.alert("Error",error.message);
            console.log(error);
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-white p-4 justify-center">
            <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>
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
            <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
                className="border border-gray-300 p-3 mb-4 rounded-lg text-gray-500"
            />
            <TextInput
                placeholder="Profile Image URL(Optional)"
                value={profileImage}
                onChangeText={setProfileImage}
                className="border border-gray-300 p-3 mb-4 rounded-lg text-gray-500"
            />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                className="border border-gray-300 p-3 mb-4 rounded-lg text-gray-500"
            />
            <TouchableOpacity
                onPress={handleSignUp}
                className="bg-blue-500 p-3 rounded-lg mb-4">
                <Text className="text-white text-lg text-center font-semibold">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Text className="text-blue-500 text-lg text-center"> Already have an account? Sign In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SignUpScreen;