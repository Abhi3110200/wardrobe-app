import {create} from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.106:8000";

export const useAuthStore = create((set) => ({
    user:null,
    token:null,
    isLoading:false,
    error:null,
    isAuthenticated:false,
    

    initializeAuth: async()=>{
        try {
            const token = await AsyncStorage.getItem("token");
            if(token){
                set({token, isAuthenticated:true});
                await useAuthStore.getState().fetchUser();
            }
        } catch (error) {
            console.log(error);
        }
    },

    
    register: async(email, password, gender, profileImage, username)=>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${BASE_URL}/register`, {email, password, gender, profileImage, username});
            const {token} = response.data;
            console.log(token);
            await AsyncStorage.setItem("token", token);
            set({token, isAuthenticated:true, isLoading:false});
            await useAuthStore.getState().fetchUser();
        } catch (error) {
            set({isLoading:false, error:error.response.data.error});
            console.log(error);
        }
    },

    login: async(email, password)=>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${BASE_URL}/login`, {email, password});
            const {token} = response.data;
            await AsyncStorage.setItem("token", token);
            set({token, isAuthenticated:true, isLoading:false});
            await useAuthStore.getState().fetchUser();
        } catch (error) {
            set({isLoading:false, error:error.response.data.error});
            console.log(error);
        }
    }
}))
