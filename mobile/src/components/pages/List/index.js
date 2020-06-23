import React, { useEffect, useState, useContext, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	AsyncStorage,
	Dimensions,
	Image,
	Animated,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { Modal } from "react-native-paper";
import { Form } from "unform";
import Input from "../../utils/Input";

export default function List({ route, navigation }) {
	const {
		idlist,
		clean,
		tasks,
		getTasksList,
		edited,
		toogleEdited,
		deleteList,
	} = useContext(listContext);
	const colors = useRef(
		Array.from({ length: tasks.length }).fill(new Animated.Value(0))
	);
	const [visible, setVisible] = useState(false);
	const [listName, setListName] = useState("");
	const screenWidth = Math.round(Dimensions.get("window").width);
	const screenHeight = Math.round(Dimensions.get("window").height);
	const formRef = useRef(null);

	async function getListName() {
		setListName(await AsyncStorage.getItem("listName"));
	}
	async function asyncGetTasks() {
		await getTasksList();
		console.log(tasks);
	}
	useEffect(() => {
		getListName();
		asyncGetTasks();
	}, [edited]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					onPress={() => {
						clean();
						navigation.goBack();
					}}
				>
					<MaterialIcons name="arrow-back" size={32} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						deleteList();
						clean();
						navigation.goBack();
					}}
				>
					<MaterialIcons name="delete" size={32} color="#bc0000" />
				</TouchableOpacity>
			</View>
			<View style={styles.titleContent}>
				<Text style={styles.titleText}>{listName}</Text>
			</View>
			<ScrollView style={{ height: screenHeight }}>
				{tasks.length > 0 ? (
					tasks.map((item, index) => (
						<TouchableOpacity key={index} style={styles.task}>
							<View style={{ flexDirection: "row" }}>
								<TouchableOpacity
									style={{ alignSelf: "center", marginRight: 8 }}
									onPress={() => {
										console.log(colors.current[index]);

										Animated.timing(colors.current[index], {
											toValue: 1,
											duration: 1000,
										}).start();
									}}
								>
									<Animated.View
										style={{
											borderColor: "#000",
											borderWidth: 3,
											borderRadius: 100,
										}}
									>
										<Animated.View
											style={{
												backgroundColor: "#000",
												height: 22,
												width: 22,
												borderRadius: 100,
												opacity: colors.current[index],
											}}
											nativeID={item._id}
										></Animated.View>
									</Animated.View>
								</TouchableOpacity>
								<View>
									<Text style={styles.taskText}>{item.title}</Text>
								</View>
							</View>

							<Animated.View
								style={{
									position: "absolute",
									alignItems: "center",
									alignContent: "center",
									opacity: 0.5,
									alignSelf: "center",
								}}
							>
								<Text
									style={{
										color: "#000",
										opacity: 0,
										fontSize: 32,
									}}
								>
									Done!!
								</Text>
							</Animated.View>
						</TouchableOpacity>
					))
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
				onPress={() => navigation.navigate("NewTask")}
			>
				<Image source={PlusImage} />
			</TouchableOpacity>
		</View>
	);
}
