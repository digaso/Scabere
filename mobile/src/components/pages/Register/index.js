import React, { useRef, useEffect } from "react";
import {
	StatusBar,
	View,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Text,
} from "react-native";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "../../utils/Input";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../../services/api";

export default function Register() {
	const formRef = useRef(null);

	function handleSubmit(data, { reset }) {
		console.log(data);
		reset();
	}
	async function loaddata() {}
	useEffect(() => {}, []);

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<MaterialIcons name="arrow-back" size={28} />
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
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</Form>
			</View>
		</View>
	);
}
