import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	list: {
		flex: 0.1,
		backgroundColor: "#eee",
		marginTop: 30,
		padding: 2,
		marginHorizontal: 15,
		borderRadius: 7,
	},
	listText: {
		fontSize: 20,
		marginTop: 5,
		marginLeft: 8,
	},
	taskText: {
		color: "#aaa",
		fontWeight: "600",
	},
	nolistText: {
		fontSize: 24,
		color: "#9a9aa9",
		alignSelf: "center",
	},
});