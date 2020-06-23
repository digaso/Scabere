import React, { useRef, useContext } from "react";
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
import mainContext from "../../../services/contexts/mainContext";
import { useEffect } from "react";

export default function Login({ route, navigation }) {
	const formRef = useRef(null);
	const { signIn, signed } = useContext(mainContext);
	function goBack() {
		navigation.goBack();
	}
	async function handleSubmit(data, { reset }) {
		await signIn(data);
	}
	useEffect(() => {
		if (signed) navigation.navigate("Main");
	}, [signed]);
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
