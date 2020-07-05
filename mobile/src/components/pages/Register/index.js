import React, { useRef, useEffect, useState } from "react";
import {
	StatusBar,
	View,
	TouchableOpacity,
	Text,
	Modal,
	Alert,
} from "react-native";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "../../utils/Input";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../../services/api";

export default function Register({ route, navigation }) {
	const formRef = useRef(null);
	const [visible, setVisible] = useState(false);
	function goBack() {
		navigation.goBack();
	}
	async function handleSubmit(data, { reset }) {
		data.birthdate = route.params.date;
		const log = await api.post("/users", data).catch((error) => {
			Alert.alert(error.response.data.message);
		});
		if (log) {
			Alert.alert(log.data.message);
			navigation.navigate("StartScreen");
		}
	}
	useEffect(() => {}, []);

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
							In this page you need to provide your email, name, username and a
							password.
						</Text>
						<Text style={{ fontSize: 20 }}>
							The username it's for a feature that we will make that let people
							interact with other users. Please protect your password and do not
							share it.
						</Text>
						<Text style={{ fontSize: 20 }}>
							We will store as weel the birth date you provided before.
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
					<View>
						<Input name="name" label="Name" />
						<Input name="username" label="Username" />
						<Input name="email" label="Email" type="email" />
						<Input name="password" label="Password" type="password" />
					</View>
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
		</View>
	);
}
