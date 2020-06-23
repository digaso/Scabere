import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	AsyncStorage,
	Image,
	Alert,
	TouchableOpacity,
	Animated,
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../../services/api";
import { useContext } from "react";
import profileContext from "../../../services/contexts/profileContext";
import mainContext from "../../../services/contexts/mainContext";

export default function Profile({ route, navigation }) {
	const [data, setData] = useState({});
	const [image, setImage] = useState("");
	const { getUserData, signOut } = useContext(mainContext);
	const { toogleEdited, edited } = useContext(profileContext);

	async function handleSignOut() {
		signOut();
		navigation.navigate("StartScreen");
	}
	function goEdit() {
		navigation.navigate("ProfileEdit");
	}
	async function getData() {
		const res = await getUserData();
		setData(res.data);
		setImage(data.photo_url);
	}
	useEffect(() => {
		getData();
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
