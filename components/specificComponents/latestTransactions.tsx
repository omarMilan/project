import { Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

// Import Icons
import ReceiveIcon from "../../assets/receiveIcon.png";
import PayIcon from "../../assets/payIcon.png";

export default function LatestTransactions() {
  const navigation = useNavigation();
  const [latestTransaction, setLatestTransaction] = useState(null);
  const userId = 1; // Change dynamically if needed

  useEffect(() => {
    fetch(`http://192.168.0.61:5000/user/${userId}/transactions`)
      .then((res) => res.json())
      .then((transactions) => {
        if (transactions.length > 0) {
          setLatestTransaction(transactions[0]); // Get the most recent transaction
        }
      })
      .catch(() => setLatestTransaction(null));
  }, []);

  return (
    <View>
      {/* Header */}
      <View className="flex items-center flex-row mt-5 px-10 text-white">
        <Text className="font-medium text-[12px] text-white">Latest Transactions</Text>
        <View className="font-light ml-auto text-[12px]">
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <Text className="font-light ml-auto text-[12px] text-white">See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Stack (Topmost = Latest) */}
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
      <View className="px-7 relative flex items-center mt-2">
        {/* ✅ Display Latest Transaction on the Topmost (z-30) rectangle */}
        <View className="absolute top-0 z-30 w-full flex justify-center ">
          <View className="bg-CustomYellow rounded-[7px] h-[35px] w-full flex flex-row items-center px-3">
            {latestTransaction ? (
              <>

                <Text className="text-black font-medium flex-1">
                  {latestTransaction.name}
                </Text>
                <Text
                  className={`font-bold ${
                    latestTransaction.name === "Deposit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {latestTransaction.name === "Deposit" ? "+" : "-"}$
                  {latestTransaction.amount.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text className="text-CustomBlack text-sm">No transactions yet</Text>
            )}
          </View>
        </View>

        {/* Shadows Below */}
        <View className="absolute top-[7px] z-20 w-full flex justify-center px-4">
          <View className="bg-CustomYellowShadeOne rounded-[7px] h-[35px] w-full"></View>
        </View>
        <View className="absolute top-[13px] z-10 w-full flex justify-center px-8">
          <View className="bg-CustomYellowShadeTwo rounded-[7px] h-[35px] w-full"></View>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
}
