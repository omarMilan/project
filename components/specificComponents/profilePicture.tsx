import { Text, View } from "react-native"
export default function ProfilePicture(){
    return(
        <View className="flex flex-row items-center gap-x-2 ml-[20px] mt-[20px]">
<View className="bg-black h-[36px] w-[36px] rounded-full"/>
<Text>Hi, UserName</Text>
</View>
    )
}