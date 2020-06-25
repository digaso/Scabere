import React, { useEffect, useState, useContext } from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import mainContext from "../../../services/contexts/mainContext";
import taskContext from "../../../services/contexts/taskContext";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Task({ route, navigation }) {
	const { idtask, clean, task } = useContext(taskContext);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
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
					<TouchableOpacity style={styles.editButton}>
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
		</SafeAreaView>
	);
}
