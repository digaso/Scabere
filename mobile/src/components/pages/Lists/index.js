import React, { useEffect, useState, useContext } from "react";
import {
	Image,
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import Animated from "react-native-reanimated";
import api from "../../../services/api";
import PlusImage from "../../../../assets/add_circle-24px.png";
import mainContext from "../../../services/mainContext";

export default function Lists({ route, navigation }) {
	const [data, setData] = useState([]);
	const { token, signed } = useContext(mainContext);
	async function getUserLists() {
		api
			.get("/lists", {
				headers: { Authorization: token },
			})
			.then((res) => {
				setData(res.data);
			});
	}

	useEffect(() => {
		getUserLists();
	}, [signed]);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ScrollView showsHorizontalScrollIndicator={false}>
				{data.length > 0 ? (
					data.map((item, index) => (
						<TouchableOpacity key={index} style={styles.list}>
							<Text style={styles.listText}>{item.name}</Text>
							<View style={styles.bottomListContainer}>
								<Text style={styles.taskText}>11 Tasks</Text>
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
			<Image source={PlusImage} />
		</View>
	);
}
