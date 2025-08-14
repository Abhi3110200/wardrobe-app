import { View, Text, TouchableOpacity, ScrollView, Pressable, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { pants, skirts, shoes, tops, mpants, mshirts } from "../images";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const AddOutfitScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { date, savedOutfits } = route?.params;
    const popularClothes = [
        ...pants,
        ...skirts,
        ...shoes,
        ...tops,
        ...mpants,
        ...mshirts,
    ].map((item, index) => ({ ...item, id: index + 1 })).filter((item) => item.image)

    const [selected, setSelected] = useState<number[]>([])
    const toggleSelection = (id: number) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((id) => id !== id) : [...prev, id]))
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-4 pt-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold">Add Outfit</Text>
                <Text className="text-gray-500">{date}</Text>
            </View>
            <View className="flex-row items-center justify-around mt-4 px-4">
                <TouchableOpacity className="items-center bg-gray-100 w-[30%] py-3 rounded-lg">
                    <Ionicons name="camera-outline" size={22} color="black" />
                    <Text className="font-medium mt-1">Selfie</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center bg-gray-100 w-[30%] py-3 rounded-lg">
                    <Ionicons name="sparkles-outline" size={22} color="black" />
                    <Text className="font-medium mt-1">Suggestion</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center bg-gray-100 w-[30%] py-3 rounded-lg">
                    <Ionicons name="shirt-outline" size={22} color="black" />
                    <Text className="font-medium mt-1">Saved Outfits</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 mt-4">
                <Text className="text-lg font-semibold px-4 pt-4">Popular Clothes</Text>
                <View className="flex-row flex-wrap px-4 mt-2 mb-20">
                    {popularClothes.map((item) => (
                        <TouchableOpacity key={item.id} onPress={()=>toggleSelection(item.id)} className="w-1/3 p-1 relative">
                            <Image source={{ uri: item.image }} className="w-full h-32 rounded-md" resizeMode="contain" />
                            <View className="absolute top-2 right-2 w-6 h-6 items-center justify-center border-2 rounded-full border-gray-200">
                                <Text className="text-xs">{item?.gender === "m" ? "♂" : item?.gender === "f" ? "♀" : "⚪"}</Text>
                            </View>
                            <View className={`absolute top-2 left-2 w-6 h-6 items-center justify-center border-2 rounded-full border-gray-200 ${selected.includes(item.id) ? "bg-black" : "border-gray-400"} items-center justify-center`}>
                                {selected.includes(item.id) && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </View>

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selected.length > 0 && (
                <View className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t-2 border-gray-200">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selected?.map((id) => {
                            const item = popularClothes.find((clothe) => clothe.id === id);
                            return (
                                <Image source={{ uri: item?.image }} className="w-16 h-16 rounded-md mr-3" />
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-black mt-3 items-center self-end py-3 mb-3 rounded-lg w-24">
                        <Text className="text-white font-semibold">Add Outfit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default AddOutfitScreen;
