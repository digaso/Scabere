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
	Alert,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import taskContext from "../../../services/contexts/taskContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import TaskItem from "../../utils/TaskItem";
import Animated from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

export default function List({ route, navigation }) {
	const {
		clean,
		getTasksList,
		edited,
		toogleEdited,
		deleteList,
		doneTasks,
		todoTasks,
	} = useContext(listContext);
	const { taskEdited, idtask, deleteTask } = useContext(taskContext);
	const [listName, setListName] = useState("");
	const [screenTasks, setScreenTasks] = useState([{}]);
	const [done, setDone] = useState(false);

	const screenHeight = Math.round(Dimensions.get("window").height);

	async function getListName() {
		setListName(await AsyncStorage.getItem("listName"));
	}
	async function asyncGetTasks() {
		await getTasksList();
	}
	useEffect(() => {
		if (listName) getListName();
		asyncGetTasks();
		setScreenTasks(done ? doneTasks : todoTasks);
		if (idtask) {
			navigation.navigate("Task");
		}
	}, [edited, taskEdited, idtask, done]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
						clean();
					}}
				>
					<MaterialIcons name="arrow-back" size={32} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							"Are you sure you want to delete this list?",
							"",
							[
								{
									text: "Cancel",
									style: "cancel",
								},
								{
									text: "OK",
									onPress: () => {
										deleteList();
										clean();
										navigation.goBack();
									},
								},
							],
							{ cancelable: true }
						);
					}}
				>
					<MaterialIcons name="delete" size={32} color="#bc0000" />
				</TouchableOpacity>
			</View>
			<View style={styles.titleContent}>
				<Text style={styles.titleText}>{listName}</Text>
			</View>

			<View style={styles.midButtonsContainer}>
				<View
					style={{
						opacity: 1,
						backgroundColor: done ? null : "#dddddd",
						borderRadius: 7,
						padding: 8,
						opacity: 1,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setDone(false);
							toogleEdited();
						}}
					>
						<Text>To do</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						opacity: 1,
						backgroundColor: done ? "#dddddd" : null,
						borderRadius: 7,
						padding: 8,
						opacity: 1,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setDone(true);
							toogleEdited();
						}}
					>
						<Text style={styles.doneButton}>Done</Text>
					</TouchableOpacity>
				</View>
			</View>
			{screenTasks.length > 0 ? (
				<FlatList
					data={screenTasks}
					renderItem={(item, index) => {
						return (
							<TaskItem
								OnSwipeRight={() => deleteTask(item.item._id)}
								{...{ item }}
							/>
						);
					}}
				/>
			) : (
				<View style={styles.emptyContent}>
					<Text style={styles.emptyText}>This list don't have tasks yet</Text>
				</View>
			)}

			<TouchableOpacity
				style={{
					position: "absolute",
					top: screenHeight - 120,
					right: 28,
					flexDirection: "row",
					width: 50,
					alignSelf: "flex-end",
				}}
				onPress={() => {
					navigation.navigate("NewTask");
				}}
			>
				<Image source={PlusImage} />
			</TouchableOpacity>
		</View>
	);
}
