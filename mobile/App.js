import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<>
				<Text> Inicio da Aplicação </Text>
			</>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#342",
		alignItems: "center",
		justifyContent: "center"
	}
});
