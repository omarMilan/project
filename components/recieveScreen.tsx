import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av"; // ✅ Import Audio API
import BackButton from "./settingComponents/backButton";
import successSE from "../assets/successSE.mp3"; // ✅ Import sound file

export default function RecievePage() {
  const [amount, setAmount] = useState("0");
  const [balance, setBalance] = useState(0);
  const [recentDeposit, setRecentDeposit] = useState(0);
  const userId = 1; // Change dynamically if needed

  useEffect(() => {
    fetch(`http://192.168.0.61:5000/user/${userId}/balance`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch(() => setBalance(0));
  }, []);

  // ✅ Function to play success sound
  const playSuccessSound = async () => {
    const { sound } = await Audio.Sound.createAsync(successSE);
    await sound.playAsync();
  };

  const handlePress = (value) => {
    if (value === "<") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setAmount((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const handleReceive = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    fetch(`http://192.168.0.61:5000/user/${userId}/receive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: depositAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Money received successfully") {
          setBalance(data.newBalance);
          setRecentDeposit(depositAmount);
          setAmount("0");

          // ✅ Play success sound
          playSuccessSound();
        } else {
          Alert.alert("Error", "Failed to add money.");
        }
      })
      .catch(() => Alert.alert("Error", "Something went wrong."));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-CustomYellow h-screen w-screen flex justify-center">
        <View className="absolute top-0 mt-2">
          <BackButton />
        </View>

        {/* Balance Display */}
        <View className="flex-col items-center">
          <Text className="text-[64px] text-customBlack font-bold">${amount}</Text>
          <Text className="font-semibold text-[16px] text-customBlack mt-[24px]">
            Current Balance: ${balance.toFixed(2)}
          </Text>
          <Text className="text-customBlack font-medium mt-2">
            +${recentDeposit.toFixed(2)} added
          </Text>
          <View className="rounded-[20px] bg-CustomBlack w-[106px] h-[40px] mt-[24px] flex items-center justify-center">
            <Text className="font-bold text-[16px] text-CustomYellow">USD</Text>
          </View>
        </View>

        {/* Number Pad */}
        <View className="flex flex-wrap flex-row justify-center items-center mt-[24px] gap-4 px-4 ">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"].map(
            (num, index) => (
              <TouchableOpacity
                key={index}
                className="w-[30%] h-[60px] flex items-center justify-center "
                onPress={() => handlePress(num)}
              >
                <Text className="text-[32px] font-bold text-customBlack">{num}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Receive Button */}
        <View className="mt-[24px] w-full flex items-center duration-500 transition-all">
          <TouchableOpacity
            disabled={amount === "0"}
            onPress={handleReceive}
            className={`rounded-[20px] ${
              amount === "0" ? "bg-CustomYellowShadeTwo" : "bg-CustomBlack "
            } w-[50%] h-[40px] flex items-center justify-center `}>
            <Text className="font-bold text-[16px] text-white">Receive</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
