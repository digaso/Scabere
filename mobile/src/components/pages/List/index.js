import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";

export default function List({ route, navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Text>Lista as</Text>
		</View>
	);
}
