import { View, Text } from "react-native"

export default function CurrencyType(){
    return(
        <View>
<View className="flex  mt-20 ">
  <Text className="font-medium ml-10 text-[12px] text-white">Currency</Text>
  <View className="flex flex-row px-6 mt-2 gap-x-2">
        <View className="w-[101px] max-[200px] flex-grow h-[181px] rounded-[14px] bg-CustomYellow"></View>
        <View className="w-[101px] max-[200px] flex-grow h-[181px] rounded-[14px] bg-CustomYellowShadeOne"></View>
        <View className="w-[101px] max-[200px] flex-grow h-[181px] rounded-[14px] bg-CustomYellowShadeTwo"></View>
  </View>
</View>

</View>
    )
}