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
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowColor: "#000",
		shadowOpacity: 0.2,
	},
	listText: {
		fontSize: 20,
		marginTop: 5,
		marginLeft: 8,
	},
	taskText: {
		marginLeft: 5,
		color: "#aaa",
		fontWeight: "600",
	},
	nolistText: {
		fontSize: 24,
		color: "#9a9aa9",
		alignSelf: "center",
	},
	modal: {
		backgroundColor: "rgba(0,0,0,0.3)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#eee",
		width: 300,
		height: 100,
		borderRadius: 7,
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	textCreateButton: {
		color: "rgba(0,30,255,0.5)",
		fontWeight: "600",
	},
	textCancelButton: {
		color: "rgba(255,0,0,0.5)",
		fontWeight: "600",
	},
	button: {
		marginVertical: 10,
		marginHorizontal: 10,
	},
});
