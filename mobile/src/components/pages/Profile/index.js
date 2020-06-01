import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	AsyncStorage,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../../services/api";
import { useContext } from "react";
import profileContext from "../../../services/profileContext";

export default function Profile({ route, navigation }) {
	const [data, setData] = useState({});
	const [image, setImage] = useState("");
	const { toogleEdited, edited } = useContext(profileContext);

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
		setImage(data.photo_url);
	}
	async function handleSignOut() {
		await AsyncStorage.removeItem("token");
		navigation.navigate("Login");
	}
	function goEdit() {
		navigation.navigate("ProfileEdit");
	}
	useEffect(() => {
		getUserData();

		if (edited) toogleEdited();
	}, [edited]);
	return (
		<View style={styles.mainContainer}>
			<StatusBar hidden />
			<View style={styles.containerUp}></View>
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
					<View style={styles.blankView}></View>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<Text style={styles.textName}>{data.name}</Text>
					</View>
					<TouchableOpacity style={styles.buttonEdit} onPress={goEdit}>
						<MaterialIcons name="create" size={30} />
					</TouchableOpacity>
					<View style={styles.blankView2}></View>
				</View>
				<TouchableOpacity style={styles.buttonSignOut} onPress={handleSignOut}>
					<Text style={styles.textButtonSignOut}>Sign Out</Text>
				</TouchableOpacity>
				<View style={styles.line}></View>
				<View style={styles.statisticsContainer}>
					<Text style={styles.comingSoon}>Statistics coming soon</Text>
				</View>
			</View>
		</View>
	);
}
