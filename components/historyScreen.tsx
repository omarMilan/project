import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import BackButton from "./settingComponents/backButton";

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);
  const userId = 1; // Change dynamically if needed

  useEffect(() => {
    fetch(`http://192.168.0.61:5000/user/${userId}/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => setTransactions([]));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-CustomYellow h-screen w-screen">
        
        {/* ✅ Fixed Header (Back Button & Title) */}
        <View className="top-0 sticky z-50 bg-CustomYellow py-3">
          <View>
            <BackButton />
          </View>
          <View className="flex items-center">
            <Text className="font-semibold text-[23px] text-customBlack">History</Text>
            <View className="w-[80%] h-[1px] bg-CustomBlack mt-1" />
          </View>
        </View>

        {/* ✅ Scrollable Transactions */}
        <ScrollView 
          className="mt-2" 
          contentContainerStyle={{ paddingBottom: 50 }} 
          showsVerticalScrollIndicator={false}
        >
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <View
                key={index}
                className="mx-5 my-2 p-3 bg-CustomBlack rounded-[7px] flex flex-row items-center"
              >
                <Text className="text-CustomYellow font-medium flex-1">
                  {transaction.name}
                </Text>
                <Text
                  className={`font-bold ${
                    transaction.name === "Deposit" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.name === "Deposit" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-center text-customBlack mt-10">No transactions yet</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
