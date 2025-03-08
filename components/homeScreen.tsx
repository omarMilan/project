import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import ProfilePicture from "./specificComponents/profilePicture";
import SettingsButton from "./specificComponents/settingsButton";
import CurrencyHandling from "./specificComponents/currencyHandling";
import LatestTransactions from "./specificComponents/latestTransactions";
import CurrencyType from "./specificComponents/currencyType";




export default function HomeScreen(){
    return(
        <SafeAreaView style={{ flex: 1 }}>
<View className="h-screen w-screen bg-CustomBlack">
    <View className="flex  flex-row items-center">
<ProfilePicture/>
<SettingsButton/>
</View>

  <View className="flex items-center mt-10 ">
    <CurrencyHandling/>
  </View>

<LatestTransactions/>

<CurrencyType/>


</View>
</SafeAreaView>
    )
}