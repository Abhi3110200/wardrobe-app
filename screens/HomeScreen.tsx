import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const features = [
    {
        title: "AI Suggestions",
        image:
            "https://i.pinimg.com/736x/2e/3d/d1/2e3dd14ac81b207ee6d86bc99ef576eb.jpg",
        screen: "AIChat",
    },
    {
        title: "AI Outfit Maker",
        image:
            "https://i.pinimg.com/736x/50/83/0e/50830e372ee844c1f429b8ef89e26fd1.jpg",
        screen: "AIOutfit",
    },
    {
        title: "AI Try On",
        image:
            "https://i.pinimg.com/736x/c2/78/95/c2789530a2dc8c9dbfd4aa5e2e70d608.jpg",
        screen: "AITryOn",
    },
    {
        title: "Color Analysis",
        image:
            "https://i.pinimg.com/736x/84/bf/ce/84bfce1e46977d50631c4ef2f72f83b1.jpg",
        screen: "ColorAnalysis",
    },
];

const popularItems = [
    {
        username: "Trisha Wushres",
        profile: "https://randomuser.me/api/portraits/women/1.jpg",
        image:
            "https://res.cloudinary.com/db1ccefar/image/upload/v1753859289/skirt3_oanqxj.png",
        itemName: "Floral Skirt",
    },
    {
        username: "Anna Cris",
        profile: "https://randomuser.me/api/portraits/women/2.jpg",
        image:
            "https://res.cloudinary.com/db1ccefar/image/upload/v1753975629/Untitled_design_3_syip4x.png",
        itemName: "Mens Jeans",
    },
    {
        username: "Isabella",
        profile: "https://randomuser.me/api/portraits/women/3.jpg",
        image:
            "https://res.cloudinary.com/db1ccefar/image/upload/v1753975802/Untitled_design_11_p7t2us.png",
        itemName: "Shoes",
    },
];

const initialStories = [
    {
        username: "Your OOTD",
        avatar: "https://picsum.photos/100/100?random=8",
        isOwn: true,
        viewed: false,
    },
    {
        username: "_trishwushres",
        avatar: "https://picsum.photos/100/100?random=10",
        isOwn: false,
        viewed: false,
    },
    {
        username: "myglam",
        avatar: "https://picsum.photos/100/100?random=11",
        isOwn: false,
        viewed: false,
    },
    {
        username: "stylist",
        avatar: "https://picsum.photos/100/100?random=12",
        isOwn: false,
        viewed: false,
    },
];

const HomeScreen = () => {

    const navigation = useNavigation();
    const [savedOutfits, setSavedOutfits] = useState([]);
    const [stories, setStories] = useState(initialStories);
    const [popular, setPopular] = useState(popularItems);
    const [showStory, setShowStory] = useState(false);
    const [currentStory, setCurrentStory] = useState<{
        username: string;
        avatar: string;
        duration: number;
    } | null>(null);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white">
                <View className="flex-row justify-between items-center px-4 pt-4">
                    <Text className="text-3xl font-bold">Fits</Text>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity className="bg-black px-4 py-1 rounded-full">
                            <Text className="text-white font-semibold text-sm">Upgrade</Text>
                        </TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                        <Ionicons name="search-outline" size={24} color="black" />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 pl-4">
                    {stories.map((story, index) => (
                        <Pressable key={index} className="mr-4 items-center">
                            <View>
                                <Image source={{ uri: story.avatar }} className={`w-16 h-16 rounded-full items-center justify-center relative ${story.viewed ? "border-2 border-gray-200" : "border-2 border-purple-400"}`} />
                                {story.isOwn && (
                                    <View className="absolute bottom-0 right-0 bg-black w-5 h-5 rounded-full items-center justify-center">
                                        <Text className="text-white text-xs">+</Text>
                                    </View>
                                )}
                            </View>
                            <Text className="text-xs">{story.username}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </ScrollView>

        </SafeAreaView>
    );
};

export default HomeScreen;
