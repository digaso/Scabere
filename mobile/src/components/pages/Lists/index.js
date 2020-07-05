import React, { useEffect, useRef, useState, useContext } from "react";
import {
	Image,
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	Modal,
	Dimensions,
	AsyncStorage,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import Animated from "react-native-reanimated";
import api from "../../../services/api";
import Input from "../../utils/Input";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/contexts/mainContext";
import listContext from "../../../services/contexts/listContext";
import { Form } from "@unform/mobile";
import { Scope } from "@unform/core";

export default function Lists({ route, navigation }) {
	const formRef = useRef(null);
	const screenWidth = Math.round(Dimensions.get("window").width);
	const screenHeight = Math.round(Dimensions.get("window").height);
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [helpvisible, setHelpVisible] = useState(false);
	const { token, signed } = useContext(mainContext);
	const { edited, addList, enterList, idlist } = useContext(listContext);

	async function getUserLists() {
		api
			.get("/lists", {
				headers: { Authorization: token },
			})
			.then((res) => {
				setData(res.data);
			});
	}
	function goToList() {
		navigation.navigate("List");
	}
	useEffect(() => {
		getUserLists();
		if (idlist) {
			goToList();
		}
	}, [signed, edited, idlist]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Modal animated={true} animationType={"slide"} visible={helpvisible}>
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
							In this page you can see all of your lists.
						</Text>
						<Text style={{ fontSize: 20 }}>
							To add a list you need to click the plus button.
						</Text>
						<Text style={{ fontSize: 20 }}>
							It will pop up an textbox for the name of your new list.
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
						onPress={() => setHelpVisible(false)}
					>
						<Text style={{ color: "#d00" }}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				visible={visible}
				transparent={true}
				onRequestClose={() => setVisible(false)}
				onDismiss={() => setVisible(false)}
				presentationStyle="overFullScreen"
			>
				<View style={styles.modal}>
					<View style={styles.modalContent}>
						<Form
							ref={formRef}
							onSubmit={(data) => {
								addList(data);
								setVisible(false);
							}}
						>
							<Input name="name" label="List name" focus={true} />
							<View style={styles.modalButtons}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => {
										setVisible(false);
									}}
								>
									<Text style={styles.textCancelButton}>Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.button}
									onPress={() => formRef.current.submitForm()}
								>
									<Text style={styles.textCreateButton}>Create</Text>
								</TouchableOpacity>
							</View>
						</Form>
					</View>
				</View>
			</Modal>
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
						setHelpVisible(true);
					}}
				>
					<MaterialIcons size={32} name="question-mark" />
				</TouchableOpacity>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				{data.length > 0 ? (
					data.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.list}
							onPress={async () => {
								await AsyncStorage.setItem("listName", item.name);
								enterList(item._id);
							}}
						>
							<Text style={styles.listText}>{item.name}</Text>
							<View style={styles.bottomListContainer}>
								<Text style={styles.taskText}>{item.numTasks} tasks</Text>
							</View>
						</TouchableOpacity>
					))
				) : (
					<View key={0}>
						<Text style={styles.nolistText}>
							Sorry, you don't have any list yet
						</Text>
					</View>
				)}
			</ScrollView>
			<TouchableOpacity
				style={{
					position: "absolute",
					top: screenHeight - 178,
					right: 28,
					flexDirection: "row",
					width: 50,
					alignSelf: "flex-end",
					shadowOffset: {
						width: 3,
						height: 3,
					},
					shadowColor: "#000",
					shadowOpacity: 0.2,
				}}
				onPress={() => setVisible(true)}
			>
				<Image source={PlusImage} />
			</TouchableOpacity>
		</View>
	);
}
