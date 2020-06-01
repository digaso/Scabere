import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	AsyncStorage,
	Image,
	Alert,
	Button,
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
import profileContext from "../../../services/profileContext";
import { useContext } from "react";

export default function ProfileEdit({ route, navigation }) {
	const [userData, setUserData] = useState({});
	const formRef = useRef(null);
	const [image, setImage] = useState(null);
	const { toogleEdited, edited } = useContext(profileContext);

	async function getUserData() {
		const token = await AsyncStorage.getItem("token");
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
				await AsyncStorage.removeItem("token");
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
		const token = await AsyncStorage.getItem("token");
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
				Alert.alert("Sorry, something went wrong with the image you chose");
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
		</View>
	);
}
