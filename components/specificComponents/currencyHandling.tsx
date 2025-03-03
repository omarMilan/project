import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import RecieveIcon from "../../assets/receiveIcon.png";
import PayIcon from "../../assets/payIcon.png";
import historyIcon from "../../assets/historyIcon.png";

export default function CurrencyHandling() {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [recentDeposit, setRecentDeposit] = useState(0);
  const userId = 1; // Change dynamically if needed

  useEffect(() => {
    fetch(`http://192.168.0.61:5000/user/${userId}/balance`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch(() => setBalance(0));

    fetch(`http://192.168.0.61:5000/user/${userId}/transactions`)
      .then((res) => res.json())
      .then((transactions) => {
        if (transactions.length > 0) {
          setRecentDeposit(transactions[0].amount); // Most recent transaction amount
        }
      })
      .catch(() => setRecentDeposit(0));
  }, []);

  return (
    <View className="w-[90%] rounded-[22px] h-[287px] bg-white flex items-center">
      <View className="w-[90%] h-[182px] bg-CustomGray mt-5 rounded-[39px] flex items-center justify-center flex-col">
        <Text className="text-[16px] font-medium">USD</Text>
        <Text className="font-bold text-[40px]">${balance.toFixed(2)}</Text>

      </View>
      <View className="flex flex-row mt-7 items-center">
        {/* Receive */}
        <TouchableOpacity 
          className="flex items-center p-2" 
          onPress={() => navigation.navigate('Recieve')}>
            <Image source={RecieveIcon} className="h-6 w-6 mb-1" resizeMode="contain" />
            <Text className="font-bold">Receive</Text>
        </TouchableOpacity>

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
    </View>
  );
}
