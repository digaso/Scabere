import React, { useContext, useEffect } from "react";
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Img from "../../../../assets/wallpap.png";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import taskContext from "../../../services/contexts/taskContext";
import api from "../../../services/api";
import { useState } from "react";

export default function Home({ route, navigation }) {
	const { token } = useContext(mainContext);
	const { enterTask, idtask } = useContext(taskContext);
	const { enterList, idlist } = useContext(listContext);
	const [data, setData] = useState({ task: {}, lists: [] });
	async function getHighlights() {
		api
			.get("/home", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setData(res.data);
			});
	}
	useEffect(() => {
		getHighlights();
		console.log(data.lists);
	}, [idtask, idlist]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ImageBackground
				source={Img}
				style={{
					width: 500,
					height: 400,
					top: -170,

					justifyContent: "flex-end",
					padding: 8,
				}}
			>
				<View style={styles.subContainer}>
					<View style={styles.scabereContainer}>
						<Text style={styles.scabereText}>Scabere.</Text>
					</View>
					<View style={styles.emptyView} />
				</View>
			</ImageBackground>
			<View style={styles.listsContainer}>
				<Text style={styles.title}>Lists</Text>
				<ScrollView horizontal={true}>
					{data.lists ? (
						data.lists.length > 1 ? (
							data.lists.map((item, index) => {
								console.log(data.lists);
								return (
									<TouchableOpacity
										style={styles.list}
										onPress={() => {
											enterList(item._id);
											navigation.navigate("List");
										}}
									>
										<Text style={styles.listName}>
											{item.name ? item.name : "list"}
										</Text>
									</TouchableOpacity>
								);
							})
						) : (
							<View style={styles.emptyLists}>
								<Text style={styles.emptyText}>Not enough lists</Text>
							</View>
						)
					) : null}
				</ScrollView>
			</View>
			<View style={styles.taskContainer}>
				<Text style={styles.title}>Highlighted Task</Text>
				{data.task.title ? (
					<TouchableOpacity
						style={styles.task}
						onPress={() => {
							enterTask(data.task._id);
							navigation.navigate("Task");
						}}
					>
						<Text style={styles.taskTitle}>{data.task.title}</Text>
						<Text style={styles.taskDescription}>
							{data.task.description
								? data.task.description
								: "Without description"}
						</Text>
						<View style={{ flexDirection: "row" }}>
							<MaterialIcons size={16} name="location-on" />
							<Text style={styles.taskLocation}>
								{data.task.location ? data.task.location : "without location"}
							</Text>
						</View>
					</TouchableOpacity>
				) : (
					<View style={{ justifyContent: "center", height: 170 }}>
						<Text style={styles.emptyText}>
							You don't have tasks to highlight
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}
