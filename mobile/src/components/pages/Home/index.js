import React from "react";
import { Image, View, Text, StatusBar } from "react-native";
import styles from "./styles";
import Icon from "../../../../assets/Scabere.png";
export default function Home() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View style={styles.form}>
				<Image source={Icon} style={styles.icon} />

				<View style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</View>
				<View style={styles.link}>
					<Text style={styles.linkText}>Create new Account </Text>
				</View>
			</View>
		</View>
	);
}
