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
		marginTop: 40,
		marginHorizontal: 15,
		borderRadius: 7,
	},
	listText: {
		fontSize: 20,
		marginTop: 5,
		marginLeft: 8,
	},
	bottomListContainer: {
		flex: 1,
		flexDirection: "row",
		marginTop: 2,
		marginHorizontal: 14,
		alignItems: "center",
		justifyContent: "space-between",
	},
	dateContainer: {
		flexDirection: "row",
	},
	dateText: {
		marginLeft: 8,
		color: "#aaa",
		fontWeight: "600",
	},
	taskText: {
		color: "#aaa",
		fontWeight: "600",
	},
});
