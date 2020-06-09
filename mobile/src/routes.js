import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import StartScreen from "./components/pages/StartScreen";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import CheckAge from "./components/pages/CheckAge";
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Lists from "./components/pages/Lists";
import ProfileEdit from "./components/pages/ProfileEdit";
import List from "./components/pages/List";
import { ProfileProvider } from "./services/profileContext";
import { MainProvider } from "./services/mainContext";
import { ListProvider } from "./services/listContext";

const AppStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ListStack = createStackNavigator();
const AppTab = createBottomTabNavigator();
function ProfileNavigator() {
	return (
		<ProfileProvider>
			<ProfileStack.Navigator
				screenOptions={{ headerShown: false, gestureEnabled: false }}
			>
				<ProfileStack.Screen name="Profile" component={Profile} />
				<ProfileStack.Screen name="ProfileEdit" component={ProfileEdit} />
			</ProfileStack.Navigator>
		</ProfileProvider>
	);
}
function ListsNavigator() {
	return (
		<ListProvider>
			<ListStack.Navigator>
				<ListStack.Screen
					options={{
						headerStyle: { backgroundColor: "#eee" },
						headerTitleContainerStyle: {
							justifyContent: "flex-start",
							flex: 1,
						},
						headerTitleAllowFontScaling: true,
						headerTitleStyle: {
							fontSize: 22,
							fontWeight: "500",
						},
					}}
					name="Lists"
					component={Lists}
				/>
				<ListStack.Screen
					name="List"
					options={{ headerShown: false }}
					component={List}
				/>
			</ListStack.Navigator>
		</ListProvider>
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
						<MaterialIcons name="dashboard" color={color} size={size} />
					),
				}}
				component={Home}
			/>
			<AppTab.Screen
				name="Lists"
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="view-split-vertical"
							color={color}
							size={size}
						/>
					),
				}}
				component={ListsNavigator}
			/>
			<AppTab.Screen
				name="Tasks"
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="event" color={color} size={size} />
					),
				}}
				component={Tasks}
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
			<MainProvider>
				<AppStack.Navigator
					screenOptions={{ headerShown: false, gestureEnabled: false }}
				>
					<AppStack.Screen name="StartScreen" component={StartScreen} />
					<AppStack.Screen name="Register" component={Register} />
					<AppStack.Screen name="Login" component={Login} />
					<AppStack.Screen name="CheckAge" component={CheckAge} />
					<AppStack.Screen name="Main" component={Main} />
				</AppStack.Navigator>
			</MainProvider>
		</NavigationContainer>
	);
}
