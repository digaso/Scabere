import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Math.round(Dimensions.get("window").height);
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
	midButtonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		flex: 0.12,
	},
	buttonPlus: {
		position: "absolute",
		top: screenHeight - 120,
		right: 28,
		flexDirection: "row",
		width: 50,
		alignSelf: "flex-end",
	},
});
