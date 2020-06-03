import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import styles from "./styles";

export default function Tasks({ route, navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Text>Tasks</Text>
		</View>
	);
}
