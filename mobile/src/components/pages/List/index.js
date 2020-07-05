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
	Modal,
	Alert,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import taskContext from "../../../services/contexts/taskContext";
import api from "../../../services/api";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import TaskItem from "../../utils/TaskItem";

export default function List({ route, navigation }) {
	const [done, setDone] = useState(false);
	const { token } = useContext(mainContext);
	const { clean, deleteList, edited, toogleEdited, idlist } = useContext(
		listContext
	);
	const {
		idtask,
		taskEdited,
		toogleTaskEdited,
		checkTask,
		deleteTask,
	} = useContext(taskContext);
	const [tasks, setTasks] = useState([]);
	const [listname, setListName] = useState("");
	const [todoTasks, setToDoTasks] = useState([]);
	const [doneTasks, setDoneTasks] = useState([]);
	const [count, setCount] = useState(0);
	const [visible, setVisible] = useState(false);
	async function getTasksList() {
		await api
			.get("/lists/" + idlist + "/tasks", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				const tasksToDoFilter = (item) => {
					return item.done === false;
				};
				const tasksDoneFilter = (item) => {
					return item.done === true;
				};
				setTasks(res.data);
				setToDoTasks(tasks.filter(tasksToDoFilter));
				setDoneTasks(tasks.filter(tasksDoneFilter));
				if (count === 0) {
					toogleEdited(true);
					setCount(1);
				}
			});
	}
	async function asyncGetListName() {
		setListName(await AsyncStorage.getItem("listName"));
	}
	const deleteListAlert = () => {
		Alert.alert("Are you sure you want to delete this list?", "", [
			{
				text: "No",
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					deleteList();
					clean();
					navigation.goBack();
				},
			},
		]);
	};
	const deleteTaskAlert = (props) => {
		Alert.alert("Are you sure you want to delete this task?", "", [
			{
				text: "No",
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: () => {
					toogleEdited(true);
					toogleTaskEdited(true);
					deleteTask(props);
					toogleEdited(true);
					toogleTaskEdited(true);
				},
			},
		]);
	};
	useEffect(() => {
		asyncGetListName();
		if (edited) toogleEdited();
		if (taskEdited) toogleTaskEdited();
		if (idtask) navigation.navigate("Task");
		getTasksList();
	}, [edited, taskEdited]);
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
						<Text style={{ fontSize: 20 }}>This page is a list.</Text>
						<Text style={{ fontSize: 20 }}>
							Here you can see you tasks divided in To do and Done.
						</Text>
						<Text style={{ fontSize: 20 }}>
							To complete a task make a litle swipe to the right and click on
							complete. To delete make litle swipe to the left and click in
							delete.
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
						Alert.alert(
							"Choose an option",
							"",
							[
								{
									text: "Cancel",
									style: "cancel",
								},
								{
									text: "Help",
									onPress: () => {
										setVisible(true);
									},
								},
								{
									text: "Delete this list",
									onPress: deleteListAlert,
								},
							],
							{ cancelable: true }
						);
					}}
				>
					<MaterialIcons name="more-horiz" size={32} color="#000" />
				</TouchableOpacity>
			</View>
			<View style={styles.titleContent}>
				<Text style={styles.titleText}>{listname}</Text>
			</View>

			<View style={styles.midButtonsContainer}>
				<View
					style={{
						backgroundColor: done ? null : "#dddddd",
						borderRadius: 7,
						padding: 8,
						opacity: 1,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setDone(false);
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
						}}
					>
						<Text style={styles.doneButton}>Done</Text>
					</TouchableOpacity>
				</View>
			</View>
			{(done && doneTasks.length > 0) ||
			(done === false && todoTasks.length > 0) ? (
				<ScrollView
					scrollEnabled={true}
					style={{ height: 1 }}
					showsVerticalScrollIndicator={false}
				>
					{done
						? doneTasks.map((item, index) => {
								return (
									<TaskItem
										key={index}
										OnSwipeRight={() => deleteTaskAlert(item._id)}
										OnSwipeLeft={() => checkTask(item._id)}
										{...{ item }}
									/>
								);
						  })
						: todoTasks.map((item, index) => {
								return (
									<TaskItem
										key={index}
										OnSwipeRight={() => deleteTaskAlert(item._id)}
										OnSwipeLeft={() => checkTask(item._id)}
										{...{ item }}
									/>
								);
						  })}
				</ScrollView>
			) : (
				<View>
					<Text style={styles.emptyText}>You don't have tasks here</Text>
				</View>
			)}

			<TouchableOpacity
				style={styles.buttonPlus}
				onPress={() => {
					navigation.navigate("NewTask");
				}}
			>
				<Image source={PlusImage} />
			</TouchableOpacity>
		</View>
	);
}
