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
import ProfileEdit from "./components/pages/ProfileEdit";
import { MaterialIcons } from "@expo/vector-icons";

const AppStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppTab = createBottomTabNavigator();
function ProfileNavigator() {
	return (
		<ProfileStack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}
		>
			<ProfileStack.Screen name="Profile" component={Profile} />
			<ProfileStack.Screen name="ProfileEdit" component={ProfileEdit} />
		</ProfileStack.Navigator>
	);
}
function Main() {
	return (
		<AppTab.Navigator
			gestureEnabled={false}
			initialRouteName="Profile"
			tabBarOptions={{
				showLabel: false,
				activeTintColor: "#fff",
				activeBackgroundColor: "#000",
				inactiveBackgroundColor: "#000",
			}}
		>
			<AppTab.Screen
				name="Home"
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="home" color={color} size={size} />
					),
				}}
				component={Home}
			/>
			<AppTab.Screen
				name="Profile"
				component={ProfileNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="account-box" color={color} size={size} />
					),
				}}
			/>
		</AppTab.Navigator>
	);
}
export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator
				screenOptions={{ headerShown: false, gestureEnabled: false }}
			>
				<AppStack.Screen name="StartScreen" component={StartScreen} />
				<AppStack.Screen name="Register" component={Register} />
				<AppStack.Screen name="Login" component={Login} />
				<AppStack.Screen name="CheckAge" component={CheckAge} />
				<AppStack.Screen name="Main" component={Main} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
