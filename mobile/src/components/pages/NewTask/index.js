import React, { useEffect, useState, useRef, useContext } from "react";
import {
	View,
	Text,
	StatusBar,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Input from "../../utils/Input";
import { Scope } from "@unform/core";
import taskContext from "../../../services/contexts/taskContext";
import { Form } from "@unform/mobile";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import listContext from "../../../services/contexts/listContext";

export default function NewTask({ route, navigation }) {
	const formRef = useRef(null);
	const { idlist } = useContext(listContext);
	const { addTask, toogleEdited } = useContext(taskContext);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<MaterialIcons
				name="arrow-back"
				size={32}
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<Text style={styles.title}>Create new Task</Text>
			<View style={styles.form}>
				<KeyboardAvoidingView>
					<Form
						ref={formRef}
						onSubmit={async (data, { reset }) => {
							await addTask(data);
							reset();
							navigation.goBack();
						}}
					>
						<Input name="title" label="Task title" focus={true} />
						<Input name="location" label="Location" />
						<Input
							name="description"
							label="Description"
							multiline={true}
							numberoflines={4}
							stylesinput={styles.textarea}
						/>
					</Form>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.buttonCreate}
							onPress={() => {
								formRef.current.submitForm();
							}}
						>
							<Text style={styles.textCreate}>Create</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonCancel}>
							<Text style={styles.textCancel}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
}
