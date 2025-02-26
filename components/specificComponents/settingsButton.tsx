import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import settingsIcon from "../../assets/settingsIcon.png";

export default function SettingsButton() {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: "row", marginRight: 20, marginTop: 20, marginLeft: "auto" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Image source={settingsIcon} style={{ height: 20, width: 20, borderRadius: 10 }} />
            </TouchableOpacity>
        </View>
    );
}
