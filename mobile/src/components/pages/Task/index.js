import React, { useEffect, useState, useContext } from "react";
import { View, Text, StatusBar, SafeAreaView, Modal } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import mainContext from "../../../services/contexts/mainContext";
import taskContext from "../../../services/contexts/taskContext";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Task({ route, navigation }) {
	const { idtask, clean, task } = useContext(taskContext);
	const [visible, setVisible] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
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
						<Text style={{ fontSize: 20 }}>This is your task.</Text>
						<Text style={{ fontSize: 20 }}>
							Here you can see your task information as location, who created it
							and description.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If you want to change some information click in the pencil to do
							so.
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
			<MaterialIcons
				name="arrow-back"
				size={32}
				onPress={() => {
					clean();
					navigation.goBack();
				}}
			/>
			<View style={styles.fullContainer}>
				<View style={styles.containerTitle}>
					<Text style={styles.textTitle}>{task.title}</Text>
					<TouchableOpacity
						style={styles.editButton}
						onPress={() => navigation.navigate("EditTask")}
					>
						<MaterialIcons name="create" size={30} />
					</TouchableOpacity>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.deadlineContainer}>
						<Text style={styles.itemLabel}>Deadline</Text>
						<View style={styles.itemTextContainer}>
							<Text
								style={
									task.deadline_date ? styles.itemText : styles.itemEmptyText
								}
							>
								{task.deadline_date
									? task.deadline_date
									: "This task doesn't have any specific deadline"}
							</Text>
						</View>
					</View>
					<View style={styles.locationContainer}>
						<Text style={styles.itemLabel}>Location</Text>
						<View style={styles.itemTextContainer}>
							<Text
								style={task.location ? styles.itemText : styles.itemEmptyText}
							>
								{task.location
									? task.location
									: "This task doesn't have any specific location"}
							</Text>
						</View>
					</View>
					<View style={styles.createdByContainer}>
						<Text style={styles.itemLabel}>Created by </Text>
						<View style={styles.itemTextContainer}>
							<Text style={styles.itemText}>{task.username}</Text>
						</View>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.itemLabel}>Description</Text>
						<View style={styles.itemTextContainer}>
							<Text
								style={
									task.description ? styles.itemText : styles.itemEmptyText
								}
							>
								{task.description
									? task.description
									: "This task don't have any description"}
							</Text>
						</View>
					</View>
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
		</SafeAreaView>
	);
}
