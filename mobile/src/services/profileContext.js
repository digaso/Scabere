import React, { createContext, useState } from "react";

const profileContext = createContext({
	edited: false,
	toogleEdited: this.toogleEdited,
});

export const ProfileProvider = ({ children }) => {
	const [edited, setEdited] = useState(false);
	function toogleEdited() {
		setEdited(edited == false ? true : false);
	}
	return (
		<profileContext.Provider value={{ edited, toogleEdited }}>
			{children}
		</profileContext.Provider>
	);
};
export default profileContext;
