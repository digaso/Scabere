import React, { createContext, useState, useContext } from "react";
import api from "../api";
import mainContext from "./mainContext";
import listContext from "./listContext";
import { useNavigation } from "@react-navigation/native";

const taskContext = createContext({
	taskEdited: false,
	idtask: null,
	toogleEdited: this.toogleEdited,
	addTask: this.addTask,
	enterTask: this.enterTask,
	clean: this.clean,
	task: {},
	tasks: [{}],
	getAllTasks: this.getAllTasks,
	deleteTask: this.deleteTask,
	doneTasks: [{}],
	todoTasks: [{}],
});

export const TaskProvider = ({ children }) => {
	const { token } = useContext(mainContext);
	const { idlist, getTasksList } = useContext(listContext);
	const [task, setTask] = useState({});
	const [tasks, setTasks] = useState([{}]);
	const [idtask, setiIdTask] = useState(null);
	const [todoTasks, setToDoTasks] = useState([{}]);
	const [doneTasks, setDoneTasks] = useState([{}]);
	const [taskEdited, setEdited] = useState(false);

	function toogleEdited() {
		setEdited(!taskEdited);
	}

	async function addTask(props) {
		console.log(idlist, "fasasd");
		await api
			.post("/tasks", props, {
				headers: {
					Authorization: token,
					idlist: idlist,
				},
			})
			.then(() => {
				toogleEdited();
			});
	}
	function clean() {
		setiIdTask(null);
	}
	async function deleteTask(props) {
		await api
			.delete("/tasks/" + props.toString(), {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				getTasksList();
			});
	}
	async function getAllTasks() {
		await api
			.get("/tasks", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				const tasksToDoFilter = (item) => {
					return item.done === false;
				};
				const tasksDoneFilter = (item) => {
					return item.done === true;
				};
				setTasks(res.data);
				setToDoTasks(tasks.filter(tasksToDoFilter));
				setDoneTasks(tasks.filter(tasksDoneFilter));
			});
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
				toogleEdited,
				addTask,
				deleteTask,
				getAllTasks,
			}}
		>
			{children}
		</taskContext.Provider>
	);
};
export default taskContext;
