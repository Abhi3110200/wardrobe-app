import { useNavigation } from "@react-navigation/native";
import { Dimensions, Text, View } from "react-native";

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
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

export default HomeScreen;
