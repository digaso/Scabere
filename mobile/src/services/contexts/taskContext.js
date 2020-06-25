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
	deleteTask: this.deleteTask,
});

export const TaskProvider = ({ children }) => {
	const { token } = useContext(mainContext);
	const { idlist, getTasksList } = useContext(listContext);
	const [task, setTask] = useState({});
	const [idtask, setiIdTask] = useState(null);
	const [taskEdited, setEdited] = useState(false);
	function toogleEdited() {
		setEdited(!taskEdited);
	}

	async function addTask(props) {
		await api
			.post("/tasks", props, {
				headers: {
					Authorization: token,
					idlist: idlist ? idlist : null,
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
				enterTask,
				toogleEdited,
				addTask,
				deleteTask,
			}}
		>
			{children}
		</taskContext.Provider>
	);
};
export default taskContext;
