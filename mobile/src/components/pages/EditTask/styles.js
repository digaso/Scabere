import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	containerTitle: {
		flex: 0.15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textTitle: {
		textAlign: "left",
		fontSize: 28,
		fontWeight: "600",
	},
	bodyContainer: {
		flex: 0.6,
		justifyContent: "space-evenly",
	},
	fullContainer: {
		flex: 1,
		marginHorizontal: 32,
	},
	itemLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	itemEmptyText: {
		color: "#bbb",
	},
	itemText: {
		fontSize: 15,
		fontWeight: "300",
	},
	descriptionContainer: {
		flex: 0.4,
		justifyContent: "flex-start",
	},
	createdByContainer: {
		flex: 0.1,
		justifyContent: "space-around",
	},
	locationContainer: {
		flex: 0.1,
		justifyContent: "space-around",
	},
	itemTextContainer: {
		marginLeft: 4,
	},
	editButton: {
		backgroundColor: "#eee",
		borderRadius: 7,
		padding: 2,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginHorizontal: 8,
		marginTop: 16,
	},
	buttonCreate: {
		backgroundColor: "rgba(0, 143, 255,0.2)",
		textAlign: "center",
		alignContent: "center",
		alignSelf: "center",
		padding: 8,
		borderRadius: 7,
		marginBottom: 100,
	},
	buttonCancel: {
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
