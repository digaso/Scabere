import React, { createContext, useState } from "react";

const listContext = createContext({
	idlist: " ",
	clean: this.clean,
});

export const ListProvider = ({ children }) => {
	const [idlist, setIdlist] = useState("");
	function clean() {
		setIdlist(idlist ? "" : idlist);
	}
	return (
		<listContext.Provider value={{ idlist, clean }}>
			{children}
		</listContext.Provider>
	);
};
export default ListProvider;
