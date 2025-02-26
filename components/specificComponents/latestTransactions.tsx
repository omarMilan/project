import { Text, View } from "react-native"

export default function LatestTransactions(){
    return(
        <View>
    <View className="flex items-center flex-row mt-5 px-10">
      <Text className="font-medium text-[12px]">
      Latest Transactions
      </Text>
      <Text className="font-light ml-auto text-[12px]">
      See All
      </Text>
    </View>
    
    <View className="px-7 relative flex items-center mt-2">
      <View className="absolute top-0 z-30 w-full flex justify-center">
        <View className="bg-CustomGrayShadeOne rounded-[7px] h-[35px] w-full "></View>
      </View>
      <View className="absolute top-[7px] z-20 w-full flex justify-center px-4">
        <View className="bg-CustomGrayShadeTwo rounded-[7px] h-[35px] w-full"></View>
      </View>
      <View className="absolute top-[13px] z-10 w-full flex justify-center px-8">
        <View className="bg-CustomGrayShadeThree rounded-[7px] h-[35px] w-full "></View>
      </View>
    </View>
    </View>
    )
}