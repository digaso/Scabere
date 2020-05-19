import React from "react";
import { View, Text, StatusBar } from "react-native";
import styles from "./styles";

export default function Home({ route, navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Text>Home</Text>
		</View>
	);
}
