import React, { useEffect, useState, useContext } from "react";
import { View, Text, StatusBar, SafeAreaView, Modal } from "react-native";
import styles from "./styles.js";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../../utils/Input";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import mainContext from "../../../services/contexts/mainContext";
import taskContext from "../../../services/contexts/taskContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef } from "react";

export default function Task({ route, navigation }) {
	const { idtask, clean, task, updateTask } = useContext(taskContext);
	const formRef = useRef(null);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<MaterialIcons
				name="arrow-back"
				size={32}
				onPress={() => {
					clean();
					navigation.navigate("List");
				}}
			/>
			<Form
				ref={formRef}
				onSubmit={(data, { reset }) => {
					updateTask(data);
					reset();
				}}
			>
				<View style={styles.fullContainer}>
					<View style={styles.containerTitle}>
						<Input
							name="title"
							value={task.title}
							stylesinput={{ fontSize: 30, borderBottomWidth: 1, width: 165 }}
						/>
					</View>
					<View style={styles.bodyContainer}>
						<View style={styles.locationContainer}>
							<Text style={styles.itemLabel}>Location</Text>
							<View style={styles.itemTextContainer}>
								<Input name="location" value={task.location} />
							</View>
						</View>
						<View style={styles.descriptionContainer}>
							<Text style={styles.itemLabel}>Description</Text>
							<View style={styles.itemTextContainer}>
								<Input
									multiline={true}
									numberoflines={4}
									name="description"
									value={task.description}
								/>
							</View>
						</View>
					</View>
				</View>
			</Form>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.buttonCreate}
					onPress={() => {
						formRef.current.submitForm();
					}}
				>
					<Text style={styles.textCreate}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonCancel}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<Text style={styles.textCancel}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
