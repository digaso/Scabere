import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	AsyncStorage,
	Image,
	Alert,
	Button,
	Modal,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { Scope } from "@unform/core";
import { Form } from "@unform/mobile";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../../utils/Input";
import styles from "./styles";

import api from "../../../services/api";
import profileContext from "../../../services/contexts/profileContext";
import mainContext from "../../../services/contexts/mainContext";
import { useContext } from "react";

export default function ProfileEdit({ route, navigation }) {
	const [userData, setUserData] = useState({});
	const { signed, token } = useContext(mainContext);
	const formRef = useRef(null);
	const [visible, setVisible] = useState(false);

	const [image, setImage] = useState(null);
	const { toogleEdited, edited } = useContext(profileContext);

	async function getUserData() {
		await api
			.get("/users", { headers: { Authorization: token } })
			.then((res) => {
				setUserData(res.data);
			})
			.catch(async (err) => {
				Alert.alert(
					err.message,
					"Sorry something happened with your session. Login again"
				);
				navigation.navigate("StartScreen");
			});
	}
	function goBack() {
		navigation.goBack();
	}
	async function openImagePicker() {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				setImage(result.uri);
			}
		} catch (E) {
			console.log(E);
		}
	}
	async function submitForm(data, { reset }) {
		let formdata = new FormData();
		if (image) {
			let uriParts = image.split(".");
			let fileType = uriParts[uriParts.length - 1];
			formdata.append("photo_url", {
				uri: image,
				name: `photo.${fileType}`,
				type: `image/${fileType}`,
			});
		} else {
			formdata.append("photo_url", undefined);
		}
		if (!image && !data.name) {
			navigation.goBack();
		}
		formdata.append("name", data.name ? data.name : userData.name);
		await api
			.put("/users", formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: token,
				},
			})
			.then(async () => {
				Alert.alert("Updated user successfuly");
				navigation.navigate("Profile");
			})
			.catch(async (err) => {
				Alert.alert(err);
				navigation.navigate("Profile");
			});
		toogleEdited();
	}
	useEffect(() => {
		getUserData();
	}, []);
	return (
		<View style={styles.mainContainer}>
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
							In this page you can edit your name and photo.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If you don't change the value in each field, it will continue the
							same data.
						</Text>
						<Text style={{ fontSize: 20 }}>
							If you want to change your photo please click in the'change photo'
							button. Beware that your image can only be 5 Mb or less.
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
			<View style={styles.containerUp}></View>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						resizeMethod="scale"
						resizeMode="cover"
						source={{ uri: image ? image : userData.photo_url }}
					/>
					<Button title="Change photo" onPress={openImagePicker} />
				</View>
				<View style={styles.subContainer}>
					<Form ref={formRef} onSubmit={submitForm}>
						<Input value={userData.name} name="name" label="Name" />
						<View style={styles.blankView}></View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.confirmButton}
								onPress={() => {
									formRef.current.submitForm();
								}}
							>
								<Text style={styles.confirmText}>Confirm</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.cancelButton} onPress={goBack}>
								<Text style={styles.cancelText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</Form>
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
		</View>
	);
}
