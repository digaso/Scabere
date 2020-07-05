import React, { useState } from "react";
import {
	Image,
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	Modal,
} from "react-native";
import styles from "./styles";
import Icon from "../../../../assets/Scabere.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen({ route, navigation }) {
	const [visible, setVisible] = useState(false);
	function goLogin() {
		navigation.navigate("Login");
	}

	function goCheckAge() {
		navigation.navigate("CheckAge");
	}
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Modal animated={true} animationType={"slide"} visible={visible}>
				<View
					style={{
						flex: 1,
						backgroundColor: "#fff",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 35 }}>Help</Text>
					<View style={{ marginHorizontal: 16 }}>
						<Text style={{ fontSize: 20 }}>
							In this page you have 2 options. Login or Create a new account.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If you have an account you can login.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If you don't have an account you need to create an account to
							login.
						</Text>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: "rgba(255,0,0,0.2)",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 10,
							padding: 20,
							marginBottom: 32,
						}}
						onPress={() => setVisible(false)}
					>
						<Text style={{ color: "#d00" }}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<View style={styles.form}>
				<Image source={Icon} style={styles.icon} />

				<TouchableOpacity style={styles.button} onPress={goLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.link} onPress={goCheckAge}>
					<Text style={styles.linkText}>Create new Account </Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flex: 0.9,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ flex: 0.8 }} />
				<TouchableOpacity
					style={{ alignSelf: "flex-end" }}
					onPress={() => {
						setVisible(true);
					}}
				>
					<MaterialIcons size={32} name="question-mark" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
