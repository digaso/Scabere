import React, { createContext, useContext, useState } from "react";
import mainContext from "./mainContext";
import api from "./api";

const listContext = createContext({
	idlist: " ",
	clean: this.clean,
	enterList: this.enterList,
	addList: this.addList,
	toogleEdited: this.toogleEdited,
	edited: false,
	tasks: [{}],
	getTasksList: this.getTasksList,
});

export const ListProvider = ({ children }) => {
	const [tasks, setTasks] = useState([{}]);
	const [idlist, setIdlist] = useState("");
	const [edited, setEdited] = useState(false);
	const { token } = useContext(mainContext);
	function clean() {
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
		setEdited(edited ? false : true);
	}
	async function getTasksList() {
		await api
			.get("/lists/" + idlist.toString() + "/tasks", {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setTasks(res.data);
			});
	}
	return (
		<listContext.Provider
			value={{
				idlist,
				clean,
				edited,
				enterList,
				addList,
				toogleEdited,
				tasks,
				getTasksList,
			}}
		>
			{children}
		</listContext.Provider>
	);
};
export default listContext;
