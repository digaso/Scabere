import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	title: {
		alignSelf: "center",
		fontSize: 25,
	},
	textarea: {
		padding: 4,
		borderColor: "#000",
		borderWidth: 1,
		borderRadius: 7,
		flex: 0.4,
		width: 170,
		marginTop: 40,
	},
	form: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 8,
		marginTop: 16,
	},
	buttonCreate: {
		flex: 0.45,
		backgroundColor: "rgba(0, 143, 255,0.2)",
		textAlign: "center",
		alignContent: "center",
		alignSelf: "center",
		padding: 8,
		borderRadius: 7,
	},
	buttonCancel: {
		flex: 0.45,
		backgroundColor: "rgba(220,0, 0,0.2)",
		textAlign: "center",
		alignContent: "center",
		alignSelf: "center",
		padding: 8,
		borderRadius: 7,
	},
	textCancel: {
		color: "rgb(220,0,0)",
		fontSize: 15,
		textAlign: "center",
	},
	textCreate: {
		color: "rgb(0, 143, 255)",
		fontSize: 15,
		textAlign: "center",
	},
});
