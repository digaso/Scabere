import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	AsyncStorage,
	Image,
	Alert,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../../services/api";

export default function StartScreen({ route, navigation }) {
	const [data, setData] = useState({});
	async function getUserData() {
		const token = await AsyncStorage.getItem("token");
		await api
			.get("/users", { headers: { Authorization: token } })
			.then((res) => {
				setData(res.data);
			})
			.catch(async (err) => {
				Alert.alert(
					err.message,
					"Sorry something happened with your session. Login again"
				);
				await AsyncStorage.removeItem("token");
				navigation.navigate("StartScreen");
			});
	}
	async function handleSignOut() {
		await AsyncStorage.removeItem("token");
		navigation.navigate("Login");
	}
	useEffect(() => {
		getUserData();
	}, []);
	return (
		<View style={styles.mainContainer}>
			<StatusBar hidden />
			<ImageBackground
				style={styles.containerUp}
				source={{
					uri: data.photo_url,
				}}
				blurRadius={4}
			></ImageBackground>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						resizeMethod="scale"
						resizeMode="cover"
						source={{ uri: data.photo_url }}
					/>
				</View>
				<View style={styles.subContainer}>
					<Text style={styles.textName}>{data.name}</Text>
					<TouchableOpacity style={styles.buttonEdit}>
						<MaterialIcons name="create" size={30} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.buttonSignOut} onPress={handleSignOut}>
					<Text style={styles.textButtonSignOut}>Sign Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
