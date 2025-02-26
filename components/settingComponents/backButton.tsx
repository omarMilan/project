import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrowPic from "../../assets/backArrow.png";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image 
        source={BackArrowPic} 
        style={{
          height: 25,
          width: 25,
          marginLeft: 20,
          marginTop: 20,
        }} 
      />
    </TouchableOpacity>
  );
}
