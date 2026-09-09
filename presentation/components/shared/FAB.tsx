import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const FAB = ({ onPress, style, iconName }: Props) => {
  return (
    <View style={[styles.btn, style]}>
      <Pressable onPress={onPress}>
        <Ionicons name={iconName} color="white" size={35} />
      </Pressable>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  btn: {
    zIndex: 99,
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
  },
});
