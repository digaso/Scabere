import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
	container: {
		flex: 2,
		backgroundColor: "#fff",
		alignItems: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		alignContent: "center",
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
		top: "-15%",
	},
	textName: {
		fontSize: 26,
		flex: 1,
		fontWeight: "300",
		alignSelf: "center",
	},
	buttonEdit: {
		backgroundColor: "rgba(0,0,0,0.05)",
		flex: 0.25,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 7,
		marginLeft: "5%",
	},
	buttonSignOut: {
		backgroundColor: "rgba(255,0,0,0.3)",
		flex: 0.12,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 7,
		marginTop: "5%",
	},
	textButtonSignOut: {
		fontSize: 22,
		paddingHorizontal: "10%",
		color: "rgba(255,0,0,1)",
	},
	subContainer: {
		flexDirection: "row",
		marginTop: "-12%",
	},
	blankView: {
		flex: 1,
	},
	blankView2: {
		flex: 0.6,
	},
});
