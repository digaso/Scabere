import React, { createContext, useContext, useState } from "react";
import mainContext from "./mainContext";
import api from "../api";

const listContext = createContext({
	idlist: " ",
	clean: this.clean,
	enterList: this.enterList,
	addList: this.addList,
	toogleEdited: this.toogleEdited,
	edited: false,
	tasksLength: 0,
	tasks: [{}],
	getTasksList: this.getTasksList,
	deleteList: this.deleteList,
	todoTasks: [{}],
	doneTasks: [{}],
});

export const ListProvider = ({ children }) => {
	const [tasks, setTasks] = useState([{}]);
	const [tasksLength, setTasksLength] = useState(0);
	const [idlist, setIdlist] = useState("");
	const [edited, setEdited] = useState(false);
	const [todoTasks, setToDoTasks] = useState([{}]);
	const [doneTasks, setDoneTasks] = useState([{}]);
	const { token } = useContext(mainContext);
	function clean() {
		setIdlist(null);
		setTasks([{}]);
	}
	function cleanIdlist() {
		setIdlist(null);
	}
	function enterList(props) {
		setIdlist(props);
	}
	async function addList(props) {
		await api
			.post("/lists", props, {
				headers: { Authorization: token },
			})
			.then(() => {
				toogleEdited();
			});
	}
	function toogleEdited() {
		setEdited(!edited);
	}
	async function getTasksList() {
		await api
			.get("/lists/" + idlist + "/tasks", {
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
				toogleEdited();
			});
	}
	async function deleteList() {
		await api
			.delete("/lists/" + idlist.toString(), {
				headers: {
					Authorization: token,
				},
			})
			.then(() => {
				toogleEdited();
			});
	}
	return (
		<listContext.Provider
			value={{
				idlist,
				todoTasks,
				doneTasks,
				clean,
				edited,
				enterList,
				addList,
				toogleEdited,
				tasks,
				getTasksList,
				deleteList,
				tasksLength,
			}}
		>
			{children}
		</listContext.Provider>
	);
};
export default listContext;
