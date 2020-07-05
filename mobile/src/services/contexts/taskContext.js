import React, { createContext, useState, useContext } from "react";
import api from "../api";
import mainContext from "./mainContext";
import listContext from "./listContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const taskContext = createContext({
	taskEdited: false,
	idtask: null,
	toogleTaskEdited: this.toogleTaskEdited,
	addTask: this.addTask,
	enterTask: this.enterTask,
	clean: this.clean,
	task: {},
	tasks: [{}],
	deleteTask: this.deleteTask,
	doneTasks: [{}],
	todoTasks: [{}],
	checkTask: this.checkTask,
	updateTask: this.updateTask,
});

export const TaskProvider = ({ children }) => {
	const { token } = useContext(mainContext);
	const { idlist, getTasksList, toogleEdited } = useContext(listContext);
	const [task, setTask] = useState({});
	const [tasks, setTasks] = useState([{}]);
	const [idtask, setiIdTask] = useState(null);
	const [todoTasks, setToDoTasks] = useState([{}]);
	const [doneTasks, setDoneTasks] = useState([{}]);
	const [taskEdited, setEdited] = useState(false);

	function toogleTaskEdited(props) {
		if (props) setEdited(props);
		else setEdited(!taskEdited);
	}
	async function checkTask(props) {
		await api
			.post("/tasks/check/" + props, null, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setEdited(true);
			});
	}
	async function updateTask(props) {
		await api
			.put("/tasks/" + idtask, props, {
				headers: {
					Authorization: token,
				},
			})
			.then(() => {
				toogleTaskEdited(true);
				console.log(idtask);
			});
	}
	async function addTask(props) {
		await api
			.post("/tasks", props, {
				headers: {
					Authorization: token,
					idlist: idlist,
				},
			})
			.then(() => {
				toogleEdited(true);
				Alert.alert("Task Successfuly added", "", [
					{
						text: "Ok",
						onPress: () => {
							toogleEdited();
						},
					},
				]);
			});
	}
	function clean() {
		setiIdTask(null);
	}
	async function deleteTask(props) {
		await api.delete("/tasks/" + props, {
			headers: {
				Authorization: token,
			},
		});

		toogleTaskEdited(true);
	}

	function enterTask(props) {
		setiIdTask(props._id);
		setTask(props);
	}
	return (
		<taskContext.Provider
			value={{
				clean,
				taskEdited,
				idtask,
				task,
				tasks,
				doneTasks,
				todoTasks,
				enterTask,
				updateTask,
				checkTask,
				toogleTaskEdited,
				addTask,
				deleteTask,
			}}
		>
			{children}
		</taskContext.Provider>
	);
};
export default taskContext;
