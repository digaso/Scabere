import React, { useRef, useContext, useState } from "react";
import {
	View,
	StatusBar,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	AsyncStorage,
	Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import Input from "../../utils/Input";
import styles from "./styles";
import Logo from "../../../../assets/Scabere.png";
import mainContext from "../../../services/contexts/mainContext";
import { useEffect } from "react";

export default function Login({ route, navigation }) {
	const formRef = useRef(null);
	const [visible, setVisible] = useState(false);
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
							In this page you can login in to your account.
						</Text>
						<Text style={{ fontSize: 20 }}>
							You need to insert your email and password.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If it's correct you enter in your account. If not you receive a
							message saying that you inserted the wrong data.
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
