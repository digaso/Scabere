import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
	divide,
	interpolate,
	Extrapolate,
	sub,
	cond,
	add,
	lessThan,
	multiply,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Action = ({ x, deleteOpacity, backgroundColor, label, OnPress }) => {
	const size = x;
	const borderRadius = divide(size, 2);
	const iconOpacity = interpolate(size, {
		inputRange: [40, 60],
		outputRange: [1, 0],
	});
	const scale = interpolate(size, {
		inputRange: [20, 30],
		outputRange: [0.001, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const textOpacity = sub(1, iconOpacity);
	return (
		<Animated.View
			style={{
				backgroundColor,
				justifyContent: "center",
				alignItems: "center",
				height: size,
				width: size,
				borderRadius,
			}}
		>
			<Animated.View
				style={{
					height: 5,
					width: 20,
					backgroundColor: "white",
					opacity: iconOpacity,
					transform: [{ scale }],
				}}
			/>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					justifyContent: "center",
					alignItems: "center",
					opacity: textOpacity,
				}}
			>
				<TouchableWithoutFeedback onPress={OnPress}>
					<Text style={styles.remove}>{label}</Text>
				</TouchableWithoutFeedback>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#312e38",
	},
	remove: {
		fontSize: 14,
		color: "#fff",
	},
});

export default Action;
