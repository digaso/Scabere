import React, { useContext } from "react";
import {
	Dimensions,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Button,
} from "react-native";
import Animated, {
	abs,
	add,
	call,
	clockRunning,
	cond,
	eq,
	not,
	set,
	useCode,
	max,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	State,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
	clamp,
	snapPoint,
	timing,
	useClock,
	usePanGestureHandler,
	useValue,
	min,
} from "react-native-redash";
import taskContext from "../../../services/contexts/taskContext";
import Action from "../Action";
import listContext from "../../../services/contexts/listContext";

function TaskItem({ item, OnSwipeLeft, OnSwipeRight }) {
	const { enterTask, toogleTaskEdited } = useContext(taskContext);
	const { toogleEdited } = useContext(listContext);
	const {
		gestureHandler,
		translation,
		velocity,
		state,
	} = usePanGestureHandler();
	const translateX = useValue(0);
	const offSetX = useValue(0);
	const height = useValue(50);
	const snapPoints = [-100, 0, 100];
	const clock = useClock();
	const to = snapPoint(translateX, velocity.x, snapPoints);
	useCode(
		() => [
			cond(
				eq(state, State.ACTIVE),
				set(translateX, add(offSetX, translation.x))
			),
			cond(eq(state, State.END), [
				set(translateX, timing({ clock, from: translateX, to })),
				set(offSetX, translateX),
			]),
		],
		[]
	);
	return (
		<Animated.View style={{ marginBottom: 20 }}>
			<View style={styles.background}>
				<Action
					x={abs(translateX)}
					backgroundColor="#0a5"
					OnPress={OnSwipeLeft}
					label="Complete"
				/>
				<Action
					x={abs(translateX)}
					backgroundColor="#f00"
					OnPress={OnSwipeRight}
					label="Remove"
				/>
			</View>
			<PanGestureHandler {...gestureHandler}>
				<Animated.View style={{ height, transform: [{ translateX }] }}>
					<TouchableWithoutFeedback
						onPress={() => {
							enterTask(item);
							toogleTaskEdited();
						}}
					>
						<View style={styles.task}>
							<View style={{ justifyContent: "center" }}>
								<Text style={styles.taskText}>{item.title}</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	background: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#eee",
		width: width,
		flexDirection: "row",
		justifyContent: "space-between",

		alignItems: "center",
		overflow: "hidden",
	},
	task: {
		alignSelf: "center",
		backgroundColor: "#fff",
		width: width,
		flexDirection: "row",
		paddingLeft: 16,
		height: 50,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: "#b0b2b2",
	},
	taskText: {
		fontSize: 18,
	},
});
export default TaskItem;
