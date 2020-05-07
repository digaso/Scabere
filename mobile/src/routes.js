import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const AppStack = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{ headerShown: false }}>
				<AppStack.Screen name="Register" component={Register} />
				<AppStack.Screen name="Home" component={Home} />
				<AppStack.Screen name="Login" component={Login} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
