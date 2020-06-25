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
});
