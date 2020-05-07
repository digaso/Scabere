import React from "react";
import { Image, View, Text, StatusBar, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "../../../../assets/Scabere.png";
export default function Home() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View style={styles.form}>
				<Image source={Icon} style={styles.icon} />

				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.link}>
					<Text style={styles.linkText}>Create new Account </Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
