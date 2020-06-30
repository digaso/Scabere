import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	midButtonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 0.22,
	},
	emptyContent: {
		marginTop: 10,
	},
	emptyText: {
		fontSize: 22,
		color: "#9a9aa9",
		alignSelf: "center",
		textAlign: "center",
	},
});
