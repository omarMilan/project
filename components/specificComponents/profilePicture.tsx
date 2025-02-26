import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import defaultProfile from "../../assets/defaultProfile.png"; // Import default profile image

export default function ProfilePicture() {
    const [username, setUsername] = useState("Loading...");
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        fetch("http://192.168.0.61:5000/user/1")  // Replace 1 with actual user ID
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setProfilePicture(data.profilePicture); // Load profile picture
            })
            .catch(() => setUsername("Error"));
    }, []);

    return (
        <View className="flex flex-row items-center gap-x-2 ml-[20px] mt-[20px]">
            <Image
                source={profilePicture ? { uri: profilePicture } : defaultProfile}
                className="h-[36px] w-[36px] rounded-full"
            />
            <Text>Hi, {username}</Text>
        </View>
    );
}
