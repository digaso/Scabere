import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	centerText: {
		flex: 1,
		alignItems: "center",
		marginTop: "4%",
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	bodyText: {
		marginTop: "5%",
		fontSize: 14,
		justifyContent: "center",
		textAlign: "center",
		fontWeight: "normal",
	},
	button: {
		backgroundColor: "#000",
		alignItems: "center",
		height: "8%",
		width: "30%",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
	},
	formContainer: {
		flex: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	pickerContainer: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "center",
	},
	picker: {
		flex: 1,
		height: 30,
	},
});
