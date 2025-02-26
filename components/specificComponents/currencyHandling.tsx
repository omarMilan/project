import { View, Text, Image } from "react-native"
import RecieveIcon from "../../assets/receiveIcon.png"
import PayIcon from "../../assets/payIcon.png"
import historyIcon from "../../assets/historyIcon.png"

export default function CurrencyHandling (){
    return(        <View className="w-[90%]  rounded-[22px] h-[287px] bg-white flex items-center">
                <View className="w-[90%] h-[182px] bg-CustomGray mt-5 rounded-[39px] flex items-center justify-center flex-col">
                    <Text className="text-[16px] font-medium">USD</Text>
                    <Text className="font-bold text-[40px]">$500</Text>
                    <Text className="font-medium text-[16px]">+250</Text>
                </View>
                <View className="flex flex-row mt-7 items-center">
          {/* Receive */}
          <View className="flex items-center">
            <Image source={RecieveIcon} className="h-6 w-6 mb-1" />
            <Text className="font-bold">Receive</Text>
          </View>
    
          <View className="w-[1px] h-12 bg-gray-400 mx-7" />
    
          {/* Pay */}
          <View className="flex items-center">
            <Image source={PayIcon} className="h-6 w-6 mb-1" />
            <Text className="font-bold">Pay</Text>
          </View>
    
          <View className="w-[1px] h-12 bg-gray-400 mx-7" />
    
          {/* History */}
          <View className="flex items-center">
            <Image source={historyIcon} className="h-6 w-6 mb-1" />
            <Text className="font-bold">History</Text>
          </View>
        </View>
    
            </View>)
}