import { Text, View, Image } from "react-native"
import settingsIcon from "../../assets/settingsIcon.png"

export default function SettingsButton(){
    return(
        <View className="flex mr-[20px] ml-auto mt-[20px] ">
<Image source={settingsIcon} className=" h-[20px] w-[20px] rounded-full"/>
</View>
    )
}