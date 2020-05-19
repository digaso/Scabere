import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StartScreen from "./components/pages/StartScreen";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import CheckAge from "./components/pages/CheckAge";
import Home from "./components/pages/Home";

const AppStack = createStackNavigator();
const AppTab = createBottomTabNavigator();

function Main() {
	return (
		<AppTab.Navigator>
			<AppTab.Screen name="Profile" component={Profile} />
			<AppTab.Screen name="Home" component={Home} />
		</AppTab.Navigator>
	);
}
export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{ headerShown: false }}>
				<AppStack.Screen name="StartScreen" component={StartScreen} />
				<AppStack.Screen name="Register" component={Register} />
				<AppStack.Screen name="Login" component={Login} />
				<AppStack.Screen name="CheckAge" component={CheckAge} />
				<AppStack.Screen name="Main" component={Main} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
