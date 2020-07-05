import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	emptyLists: {
		height: 150,
		width: 300,
		marginRight: 16,
		marginLeft: 16,
		padding: 8,
		justifyContent: "center",
	},
	emptyText: {
		fontWeight: "700",
		fontSize: 20,
		color: "#ccc",
		alignSelf: "center",
		textAlign: "center",
	},
	scabereText: {
		color: "white",
		fontSize: 42,
		textShadowColor: "black",
		textShadowOffset: {
			height: 3,
			width: 3,
		},
		textShadowRadius: 10,
		shadowOpacity: 0.6,
	},
	listsContainer: {
		top: "-23%",
		marginLeft: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
	},
	listsTextContainer: {
		flex: 0.1,
	},
	taskContainer: {
		top: "-20%",
		marginLeft: 16,
		marginRight: 32,
		marginTop: 32,
		justifyContent: "space-evenly",
	},
	taskTitle: {
		fontWeight: "700",
		fontSize: 20,
	},
	taskDescription: {
		fontWeight: "500",
	},
	taskLocation: {
		fontSize: 13,
		fontWeight: "300",
	},
	task: {
		marginTop: 8,
		backgroundColor: "#eee",
		borderRadius: 10,
		height: 150,
		justifyContent: "space-between",
		padding: 8,
	},
	listName: {
		alignSelf: "flex-start",
		fontSize: 16,
		fontWeight: "600",
	},
	list: {
		marginTop: 4,
		height: 150,
		width: 130,
		marginRight: 16,
		marginLeft: 16,
		padding: 8,
		borderRadius: 10,
		backgroundColor: "#eee",
		justifyContent: "center",
	},
});
