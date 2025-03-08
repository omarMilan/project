import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";

export default function ProfilePicture() {
    const [username, setUsername] = useState("Loading...");


    useEffect(() => {
        fetch("http://192.168.0.61:5000/user/1")  // Replace 1 with actual user ID
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);

            })
            .catch(() => setUsername("Error"));
    }, []);

    return (
        <View className="flex flex-row items-center gap-x-2 ml-[20px] mt-[20px]">

            <Text className="font-bold italic text-[32px] text-white">{username}</Text>
        </View>
    );
}
