import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./settingComponents/backButton";
import editIcon from "../assets/editIcon.png";

export default function SettingsScreen() {
    const [username, setUsername] = useState("Loading...");
    const [newUsername, setNewUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        fetch("http://192.168.0.61:5000/user/1") // Replace 1 with actual user ID
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setNewUsername(data.username);
                setProfilePicture(data.profilePicture); // Load profile picture
            })
            .catch(() => setUsername("Error"));
    }, []);

    // Function to update the username
    const updateUsername = () => {
        fetch("http://192.168.0.61:5000/user/1", { // Replace 1 with actual user ID
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === "Username updated successfully") {
                setUsername(newUsername);
            }
        })
        .catch(() => console.error("Failed to update username"));
    };

    // Function to pick an image from the gallery
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Denied", "You need to allow access to the gallery.");
            return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [ImagePicker.MediaType.IMAGE], // ✅ Fix deprecated API
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true, // Ensure Base64 encoding
        });
    
        if (!result.canceled) {
            setProfilePicture(result.uri); // Update UI immediately
            uploadProfilePicture(result.base64);
        }
    };
    


    // Function to upload profile picture to backend
    const uploadProfilePicture = (base64Image) => {
        fetch("http://192.168.0.61:5000/user/1/upload", { // Replace 1 with actual user ID
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profilePicture: `data:image/png;base64,${base64Image}` }), // Ensure proper format
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === "Profile picture updated successfully") {
                Alert.alert("Success", "Profile picture updated!");
            } else {
                console.error("Failed to update profile picture:", data);
            }
        })
        .catch((err) => console.error("Error updating profile picture:", err));
    };
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="bg-CustomGray h-screen w-screen">

                <View className="flex">
                    <BackButton />
                </View>

                <View className="flex flex-col justify-center mt-20 items-center px-20">
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={profilePicture ? { uri: profilePicture } : require("../assets/defaultProfile.png")}
                            className="w-[250px] h-[250px]  rounded-full bg-black"
                        />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center gap-x-2 justify-center space-x-2 mt-3">
                        <TextInput
                            className="font-medium text-[25px] p-2 rounded"
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder={username}
                            onSubmitEditing={updateUsername}
                            returnKeyType="done"
                            blurOnSubmit={true}
                        />
                        <TouchableOpacity onPress={updateUsername}>
                            <Image source={editIcon} className="w-[20px] h-[20px] align-middle" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex px-10 mt-10">
                    <View className="bg-CustomRed w-full h-10 items-center justify-center rounded-[7px]">
                        <Text className="font-medium text-[12px]"> Reset Progress </Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}
