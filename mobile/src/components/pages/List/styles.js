import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	titleContent: {
		alignContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	titleText: {
		fontSize: 32,
	},
	emptyContent: {
		marginTop: 10,
	},
	emptyText: {
		fontSize: 24,
		color: "#9a9aa9",
		alignSelf: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 10,
		marginVertical: 10,
	},
	task: {
		flex: 1,
		justifyContent: "flex-start",
		marginVertical: 8,
		marginHorizontal: 8,
		backgroundColor: "#eee",
		paddingVertical: 8,
		paddingLeft: 8,
		borderRadius: 4,
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowColor: "#000",
		shadowOpacity: 0.2,
	},
	taskText: {
		fontSize: 18,
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
});
