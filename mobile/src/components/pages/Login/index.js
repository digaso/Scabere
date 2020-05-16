import React from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Input from "../../utils/Input";

export default function Login() {
	const navigation = useNavigation();
	function goBack() {
		navigation.goBack();
	}
	return (
		<View>
			<StatusBar hidden />
			<TouchableOpacity onPress={goBack}>
				<MaterialIcons name="arrow-back" size={28} />
			</TouchableOpacity>
		</View>
	);
}
