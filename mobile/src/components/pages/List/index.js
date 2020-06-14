import React, { useEffect, useState, useContext } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	AsyncStorage,
	Dimensions,
	Image,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/mainContext";
import listContext from "../../../services/listContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

export default function List({ route, navigation }) {
	const { idlist, clean, tasks, getTasksList, edited } = useContext(
		listContext
	);
	const [listName, setListName] = useState("");
	const screenWidth = Math.round(Dimensions.get("window").width);
	const screenHeight = Math.round(Dimensions.get("window").height);

	async function getListName() {
		setListName(await AsyncStorage.getItem("listName"));
	}

	useEffect(() => {
		getListName();
		getTasksList();
		console.log(tasks);
	}, [edited]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<TouchableOpacity>
				<MaterialIcons
					name="arrow-back"
					size={32}
					onPress={() => {
						clean();
						navigation.goBack();
					}}
				/>
			</TouchableOpacity>
			<View style={styles.titleContent}>
				<Text style={styles.titleText}>{listName}</Text>
			</View>
			<ScrollView>
				{tasks.length > -1 ? (
					<TouchableOpacity key={0} style={styles.task}>
						<Text style={styles.taskText}>324</Text>
					</TouchableOpacity>
				) : (
					<View style={styles.emptyContent}>
						<Text style={styles.emptyText}>This list don't have tasks yet</Text>
					</View>
				)}
			</ScrollView>
			<TouchableOpacity
				style={{
					position: "absolute",
					top: screenHeight - 120,
					right: 28,
					flexDirection: "row",
					width: 50,
					alignSelf: "flex-end",
				}}
				onPress={() => setVisible(true)}
			>
				<Image source={PlusImage} />
			</TouchableOpacity>
		</View>
	);
}
