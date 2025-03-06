import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Alert, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import BackButton from "./settingComponents/backButton";
import successSE from "../assets/successSE.mp3";

import dineIcon from "../assets/purchaseIcons/dineIcon.png";
import enterIcon from "../assets/purchaseIcons/enterIcon.png";
import giftIcon from "../assets/purchaseIcons/giftIcon.png";
import miscIcon from "../assets/purchaseIcons/miscIcon.png";
import purchaseIcon from "../assets/purchaseIcons/purchaseIcon.png";
import transIcon from "../assets/purchaseIcons/transIcon.png";


const icons = [dineIcon, enterIcon, giftIcon, miscIcon, purchaseIcon, transIcon];

export default function PurchaseScreen() {
  const [amount, setAmount] = useState("0");
  const [balance, setBalance] = useState(0);
  const [purchaseName, setPurchaseName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const userId = 1;

  useEffect(() => {
    fetch(`http://192.168.0.61:5000/user/${userId}/balance`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch(() => setBalance(0));
  }, []);

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

  const handlePurchase = () => {
    const expenseAmount = parseFloat(amount);

    if (!purchaseName.trim()) {
      Alert.alert("Missing Name", "Please enter a purchase name.");
      return;
    }

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    fetch(`http://192.168.0.61:5000/user/${userId}/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: purchaseName, amount: expenseAmount, icon: selectedIcon }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Transaction logged") {
          setBalance(data.newBalance);
          setAmount("0");
          setPurchaseName("");

          playSuccessSound();
        } else {
          Alert.alert("Error", "Failed to log purchase.");
        }
      })
      .catch(() => Alert.alert("Error", "Something went wrong."));
  };

  const changeIcon = () => {
    setSelectedIcon((prev) => {
      const currentIndex = icons.indexOf(prev);
      return icons[(currentIndex + 1) % icons.length];
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-white h-screen w-screen flex justify-center">
        <View className="absolute top-0 mt-2">
          <BackButton />
        </View>



        {/* Purchase Name Input with Icon Inside */}
        <View className="flex items-center">
<View className="mt-4 mb-4 px-7 flex flex-row w-[90%] items-center bg-CustomGrayShadeTwo rounded-[20px] p-4">
  {/* Icon Selection */}
  <TouchableOpacity onPress={changeIcon} className="mr-3">
    <Image source={selectedIcon} className="bg-white rounded-md p-6 shadow-black drop-shadow-sm w-[15px] h-[15px]" />
  </TouchableOpacity>

  {/* Text Input */}
  <TextInput
    placeholder="Enter purchase name"
    placeholderTextColor="white"
    value={purchaseName}
    onChangeText={setPurchaseName}
    className="flex-1 text-lg text-center -translate-x-7"
    style={{ color: "white", fontWeight: "bold" }}
  />
</View>
</View>



        {/* Balance Display */}
        <View className="flex-col items-center">
          <Text className="text-[64px] font-bold">${amount}</Text>
          <Text className="font-semibold text-[16px] mt-[24px]">
            Current Balance: ${balance.toFixed(2)}
          </Text>
          <View className="rounded-[20px] bg-CustomGrayShadeTwo w-[106px] h-[40px] mt-[24px] flex items-center justify-center">
            <Text className="font-bold text-[16px] text-white">USD</Text>
          </View>
        </View>



        {/* Number Pad */}
        <View className="flex flex-wrap flex-row justify-center items-center mt-[10px] gap-4 px-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "<"].map(
            (num, index) => (
              <TouchableOpacity
                key={index}
                className="w-[30%] h-[60px] flex items-center justify-center"
                onPress={() => handlePress(num)}
              >
                <Text className="text-[32px] font-bold">{num}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Purchase Button */}
        <View className="mt-[24px] w-full flex items-center">
          <TouchableOpacity
            disabled={amount === "0"}
            onPress={handlePurchase}
            className={`rounded-[20px] ${amount === "0" ? "bg-CustomGrayShadeTwo" : "bg-red-500"} w-[50%] h-[40px] flex items-center justify-center`}>
            <Text className="font-bold text-[16px] text-white">Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
