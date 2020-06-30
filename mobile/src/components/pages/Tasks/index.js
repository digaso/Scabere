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
	StyleSheet,
} from "react-native";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import taskContext from "../../../services/contexts/taskContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import TaskItem from "../../utils/TaskItem";
import Animated, { useCode, cond } from "react-native-reanimated";
import {
	FlatList,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useValue } from "react-native-redash";

export default function Tasks({ route, navigation }) {
	const { clean, edited, toogleEdited } = useContext(listContext);
	const {
		taskEdited,
		getAllTasks,
		idtask,
		deleteTask,
		doneTasks,
		todoTasks,
	} = useContext(taskContext);
	const [screenTasks, setScreenTasks] = useState([{}]);
	const [done, setDone] = useState(false);

	useEffect(() => {
		if (taskEdited) getAllTasks();
		setScreenTasks(done ? doneTasks : todoTasks);

		if (idtask) {
			navigation.navigate("Task");
		}
	}, [edited, taskEdited, idtask, done]);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
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
						}}
					>
						<Text style={styles.doneButton}>Done</Text>
					</TouchableOpacity>
				</Animated.View>
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
				<SafeAreaView style={styles.emptyContent}>
					<Text style={styles.emptyText}>
						You don't have tasks in this category yet
					</Text>
				</SafeAreaView>
			)}
		</View>
	);
}
