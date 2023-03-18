import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
// Components
import {
    StyleSheet,
    Button,
    Text,
    View,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    SectionList,
} from "react-native";
// Configs
import { IP_ADDRESS } from "@env";
import UserContext from "../../hooks/context/UserContext";

const LostHistory = () => {
  return (
    <View>
      <Text>LostHistory</Text>
    </View>
  )
}

export default LostHistory

const styles = StyleSheet.create({})