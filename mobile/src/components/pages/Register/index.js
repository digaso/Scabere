import React, { useRef, useEffect } from "react";
import { StatusBar, View, TouchableOpacity, Text, Alert } from "react-native";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "../../utils/Input";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";

export default function Register({ route, navigation }) {
	const formRef = useRef(null);
	function goBack() {
		navigation.goBack();
	}
	async function handleSubmit(data, { reset }) {
		data.birthdate = route.params.date;
		const log = await api.post("/users", data);
		Alert.alert(log.data.message);
	}
	useEffect(() => {}, []);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<TouchableOpacity onPress={goBack}>
				<MaterialIcons name="arrow-back" size={28} />
			</TouchableOpacity>
			<View style={styles.textcontainer}>
				<Text style={styles.text}>Thanks!</Text>
				<Text style={styles.text}>
					Now we need this information and then you're ready
				</Text>
			</View>
			<View style={styles.formcontainer}>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input name="name" label="Name" />
					<Input name="username" label="Username" />
					<Input name="email" label="Email" type="email" />
					<Input name="password" label="Password" type="password" />
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							formRef.current.submitForm();
						}}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</Form>
			</View>
		</View>
	);
}
