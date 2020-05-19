import React, { useRef } from "react";
import {
	View,
	StatusBar,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "../../utils/Input";
import styles from "./styles";
import Logo from "../../../../assets/Scabere.png";
import api from "../../../services/api";

export default function Login({ route, navigation }) {
	const formRef = useRef(null);
	function goBack() {
		navigation.goBack();
	}
	async function handleSubmit(data, { reset }) {
		const log = await api
			.post("/login", data)
			.then(async (res) => {
				await AsyncStorage.setItem("token", res.data.token);
				navigation.navigate("Main");
			})
			.catch((error) => {
				if (error.response) {
					Alert.alert(error.response.data.message);
				}
			});
	}
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<TouchableOpacity onPress={goBack}>
				<MaterialIcons name="arrow-back" size={28} />
			</TouchableOpacity>
			<View style={styles.formcontainer}>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<View>
						<Image source={Logo} style={styles.logo} />
						<Input name="email" label="Email" type="email" />
						<Input name="password" label="Password" type="password" />
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							formRef.current.submitForm();
						}}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</Form>
			</View>
		</View>
	);
}
