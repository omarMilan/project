import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./settingComponents/backButton";
import editIcon from "../assets/editIcon.png";
import SplashScreenImage from "../assets/SplashScreen.png"; // ✅ Import normal image

export default function SettingsScreen() {
    const [username, setUsername] = useState("Loading...");
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        fetch("http://192.168.0.61:5000/user/1") // Replace 1 with actual user ID
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setNewUsername(data.username);
            })
            .catch(() => setUsername("Error"));
    }, []);

    // ✅ Function to update the username
    const updateUsername = () => {
        fetch("http://192.168.0.61:5000/user/1", { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === "Username updated successfully") {
                setUsername(newUsername);
                Alert.alert("Success", "Username updated!");
            }
        })
        .catch(() => Alert.alert("Error", "Failed to update username"));
    };

    // ✅ Function to reset User 1 (username & balance)
    const resetUser = () => {
        fetch("http://192.168.0.61:5000/user/1/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === "User and transactions reset successfully") {
                setUsername("User1");
                setNewUsername("User1");
                Alert.alert("Reset Complete", "User and all transactions have been reset!");
            }
        })
        .catch(() => Alert.alert("Error", "Failed to reset user"));
    };
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="bg-CustomYellow h-screen w-screen">

                <View className="flex">
                    <BackButton />
                </View>

                <View className="flex flex-col justify-center mt-20 items-center px-20">
                    {/* ✅ Display SplashScreen Image */}
                    <Image
                        source={SplashScreenImage}
                        className="w-[100%] rounded-full h-[300px]"
                        resizeMode="contain"
                    />
                    
                    {/* ✅ Username Input (Original Colors) */}
                    <View className="flex flex-row items-center gap-x-2 justify-center space-x-2 mt-3 bg-CustomBlack rounded-lg px-3 py-2">
                        <TextInput
                            className="font-medium text-[25px] text-CustomYellow flex-1"
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder={username}
                            onSubmitEditing={updateUsername}
                            returnKeyType="done"
                            blurOnSubmit={true}
                        />
                        <TouchableOpacity onPress={updateUsername}>
                            <Image source={editIcon} className="w-[20px] h-[20px]" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ✅ Reset Progress Button (Now Red) */}
                <View className="flex px-10 mt-10">
                    <TouchableOpacity 
                        className="bg-red-500 w-full h-10 items-center justify-center rounded-[7px]"
                        onPress={resetUser}
                    >
                        <Text className="font-medium text-[12px] text-white"> Reset Progress </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}
