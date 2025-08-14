import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

interface ClothingItem {
    id: number;
    image: string;
    x: number;
    y: number;
    type?: "pants" | "shoes" | "shirt" | "skirts";
    gender?: "m" | "f" | "unisex";
}

const NewOutfitScreen = () => {
    const route = useRoute();
    const { selectedItems, date, savedOutfits } = route?.params as { selectedItems: ClothingItem[], date: string, savedOutfits: { [key: string]: any[] } };
    const [caption, setCaption] = useState<string>('');
    const navigation = useNavigation();
    const [isOotd, setIsOotd] = useState<boolean>(false);
    const [occasion, setOccasion] = useState<string>('Work');
    const [loading, setLoading] = useState<boolean>(false);
    const [visibility, setVisibility] = useState<string>('Everyone');
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between p-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text className="text-lg font-semibold">New Outfit</Text>
            </View>
            <View className="flex-1 items-center justify-center">
                {selectedItems?.sort((a, b) => {
                    const order = {
                        shirt:1,
                        skirts:2,
                        pants:3,
                        shoes:4,
                    }

                    return (order[a.type] || 5) - (order[b.type] || 5)
                })?.map((item,index ) => (
                    <Image
                        key={index}
                        resizeMode="contain"
                        style={{
                            width:240,
                            height: item?.type == "shoes" ? 180 : 240,
                            marginBottom: index < selectedItems.length - 1 ? -59 : 0,
                        }}
                        source={{ uri: item.image }}
                    />
                ))}
            </View>

            <View className="p-4">
                <TextInput
                    placeholder="Add a Caption..."
                    value={caption}
                    onChangeText={setCaption}
                    className="border-b border-gray-300 pb-2 text-gray-500"
                />
                <View className="mt-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-gray-500">Date</Text>
                        <Text className="text-black">{date || "Today"}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-gray-500">Add to OOTD Story</Text>
                        <Switch
                            value={isOotd}
                            onValueChange={setIsOotd}
                        />
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="text-gray-500">Occasion</Text>
                        <Text className="text-black">{occasion}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-4">
                        <Text className="text-gray-500">Visibility</Text>
                        <Text className="text-black">{visibility}</Text>
                    </View>
                </View>

            </View>
                <TouchableOpacity className="bg-black py-3 rounded mx-4 mb-4">
                    <Text className="text-white text-center font-semibold">Save</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
};

export default NewOutfitScreen;