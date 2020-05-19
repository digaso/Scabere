import React from "react";
import { Image, View, Text, StatusBar, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "../../../../assets/Scabere.png";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen({ route, navigation }) {
	function goLogin() {
		navigation.navigate("Login");
	}

	function goCheckAge() {
		navigation.navigate("CheckAge");
	}
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View style={styles.form}>
				<Image source={Icon} style={styles.icon} />

				<TouchableOpacity style={styles.button} onPress={goLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.link} onPress={goCheckAge}>
					<Text style={styles.linkText}>Create new Account </Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
