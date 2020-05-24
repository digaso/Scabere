import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 2,
		backgroundColor: "#fff",
		alignItems: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		top: "-5%",
	},
	containerUp: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#008fff",
	},
	image: {
		borderRadius: 1000,
		height: 120,
		width: 120,
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	imageContainer: {
		position: "relative",
		top: "-15%",
	},
	textName: {
		fontSize: 30,
		flex: 0.6,
		fontWeight: "300",
		alignSelf: "center",
	},
	subContainer: {
		flex: 1,
		flexDirection: "column",
		marginTop: "-10%",
		alignItems: "center",
	},
	confirmButton: {
		backgroundColor: "rgba(0, 143, 255,0.3)",
		flex: 0.3,
		height: 35,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	cancelButton: {
		backgroundColor: "rgba(220,0, 0,0.2)",
		flex: 0.3,
		height: 35,
		borderRadius: 7,
		marginLeft: "5%",
		alignItems: "center",
		justifyContent: "center",
	},
	confirmText: {
		color: "rgb(0, 143, 255)",
		fontSize: 20,
	},
	cancelText: {
		color: "rgb(220,0, 0)",
		fontSize: 20,
	},
	blankView: {
		flex: 0.3,
	},
	buttonContainer: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
});
