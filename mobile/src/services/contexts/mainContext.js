import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import api from "../api";

const mainContext = createContext({
	token: "",
	signed: false,
	signIn: this.signIn,
	getUserData: this.getUserData,
	signOut: this.signOut,
});
export const MainProvider = ({ children, navigation }) => {
	const [signed, setSigned] = useState(false);
	const [token, setToken] = useState("");
	function signOut() {
		setSigned(false);
		setToken("");
	}
	async function signIn(props) {
		await api
			.post("/login", props)
			.then(async (res) => {
				setToken(res.data.token);
				setSigned(true);
			})
			.catch((error) => {
				if (error.response) {
					Alert.alert(error.response.data.message);
				}
			});
	}
	async function getUserData() {
		let result;
		await api
			.get("/users", { headers: { Authorization: token } })
			.then((res) => {
				result = res;
			})
			.catch(async (err) => {
				Alert.alert(
					err.message,
					"Sorry something happened with your session. Login again"
				);
				setToken("");
			});
		return result;
	}
	return (
		<mainContext.Provider
			value={{ signed, token, signIn, getUserData, signOut }}
		>
			{children}
		</mainContext.Provider>
	);
};
export default mainContext;
