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
	Modal,
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
	const [visible, setVisible] = useState(false);

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
							In this page you can see your account.
						</Text>
						<Text style={{ fontSize: 20 }}>
							You can see your name and your photo. When you create a new
							account you start with a default picture. To change your photo or
							name click in the pencil button to do that. To leave this account
							press 'Sign Out' button.
						</Text>
						<Text style={{ fontSize: 20 }}>
							As you can see the statistics are coming soon. It will have
							multiple data about you and how you complete tasks.
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
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ flex: 0.7 }} />
				<TouchableOpacity
					style={{ alignSelf: "flex-end", marginRight: 16, marginBottom: 16 }}
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
