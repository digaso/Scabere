import React, { useEffect, useState, useContext, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	AsyncStorage,
	Image,
	Alert,
	Modal,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import taskContext from "../../../services/contexts/taskContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import TaskItem from "../../utils/TaskItem";
import Animated from "react-native-reanimated";

import api from "../../../services/api";

export default function Tasks({ route, navigation }) {
	const { edited, toogleEdited } = useContext(listContext);
	const { token } = useContext(mainContext);
	const [count, setCount] = useState(0);
	const [tasks, setTasks] = useState([]);
	const [todoTasks, setToDoTasks] = useState([]);
	const [doneTasks, setDoneTasks] = useState([]);
	const {
		idtask,
		deleteTask,
		taskEdited,
		checkTask,
		toogleTaskEdited,
	} = useContext(taskContext);
	const [done, setDone] = useState(false);
	const [visible, setVisible] = useState(false);

	async function getAllTasks() {
		await api
			.get("/tasks", {
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

				setToDoTasks(res.data.filter(tasksToDoFilter));
				setDoneTasks(res.data.filter(tasksDoneFilter));
				if (count === 0) {
					toogleTaskEdited();
					setCount(1);
				}
			});
	}

	useEffect(() => {
		if (taskEdited) toogleTaskEdited(false);
		if (edited) toogleEdited(false);
		if (idtask) {
			navigation.navigate("Task");
		}
		getAllTasks();
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
						<Text style={{ fontSize: 20 }}>
							In this page you can see all of your tasks from all of your lists.
						</Text>
						<Text style={{ fontSize: 20 }}>
							Here you can complete and delete your tasks.
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
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={{ flex: 0.7 }} />
				<TouchableOpacity
					style={{ alignSelf: "flex-end", marginRight: 16 }}
					onPress={() => {
						setVisible(true);
					}}
				>
					<MaterialIcons size={32} name="question-mark" />
				</TouchableOpacity>
			</View>

			<View style={styles.midButtonsContainer}>
				<Animated.View
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
							toogleTaskEdited();
						}}
					>
						<Text>To do</Text>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View
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
							toogleTaskEdited();
						}}
					>
						<Text style={styles.doneButton}>Done</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
			{(done && doneTasks.length > 0) ||
			(done === false && todoTasks.length > 0) ? (
				<ScrollView
					onMomentumScrollEnd={() => toogleTaskEdited()}
					scrollEnabled={true}
					style={{ height: 1 }}
					showsVerticalScrollIndicator={false}
				>
					{done
						? doneTasks.map((item, index) => {
								return (
									<TaskItem
										key={index}
										OnSwipeRight={() => deleteTask(item._id)}
										OnSwipeLeft={() => checkTask(item._id)}
										{...{ item }}
									/>
								);
						  })
						: todoTasks.map((item, index) => {
								return (
									<TaskItem
										key={index}
										OnSwipeLeft={() => checkTask(item._id)}
										OnSwipeRight={() => deleteTask(item._id)}
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
		</View>
	);
}
