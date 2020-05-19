import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	formcontainer: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-evenly",
	},
	button: {
		backgroundColor: "#000",
		height: "8%",
		width: "30%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
	},
	logo: {
		alignSelf: "center",
		marginBottom: "2%",
	},
});
