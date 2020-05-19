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
		backgroundColor: "#000",
		alignItems: "center",
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
		paddingLeft: "4%",
		fontSize: 30,
		flex: 0.6,
		fontWeight: "300",
		alignSelf: "center",
	},
	buttonEdit: {
		backgroundColor: "rgba(0,0,0,0.1)",
		flex: 0.14,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 7,
	},
	buttonSignOut: {
		backgroundColor: "rgba(255,0,0,0.3)",
		flex: 0.15,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 7,
		marginTop: "5%",
	},
	textButtonSignOut: {
		fontSize: 22,
		paddingHorizontal: "10%",
		color: "rgba(220,0,0,1)",
	},
	subContainer: {
		flexDirection: "row",
		marginTop: "-12%",
		paddingLeft: "19%",
		alignItems: "center",
	},
});
