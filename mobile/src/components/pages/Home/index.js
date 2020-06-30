import React from "react";
import {
	View,
	Text,
	StatusBar,
	ImageBackground,
	Dimensions,
} from "react-native";
import styles from "./styles";
import Img from "../../../../assets/wallpap.png";

export default function Home({ route, navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ImageBackground
				source={Img}
				style={{
					width: 500,
					height: 400,
					top: -170,
					left: 40,
					justifyContent: "flex-end",
					padding: 8,
				}}
			>
				<Text style={styles.scabereText}>Scabere.</Text>
			</ImageBackground>
		</View>
	);
}
