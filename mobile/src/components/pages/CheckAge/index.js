import React, { useState, useEffect } from "react";
import {
	View,
	StatusBar,
	Text,
	TouchableOpacity,
	Picker,
	Alert,
} from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import monthDays from "month-days";

export default function CheckAge({ route, navigation }) {
	const [days, setDays] = useState([]);
	const [months, setMonths] = useState([
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]);
	const [years, setYears] = useState([]);
	const [selectedDay, setSelectedDay] = useState(1);
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [selectedYear, setSelectedYear] = useState(2020);

	function navigateToRegister(date) {
		navigation.navigate("Register", {
			date,
		});
	}
	function generateDays() {
		const numberdays = monthDays({ month: selectedMonth, year: selectedDay });
		let arrayNumber = [];
		for (let index = 1; index <= numberdays; index++) {
			arrayNumber.push(index);
		}
		setDays(arrayNumber);
		return arrayNumber;
	}
	function zerosBehind() {
		let birthDate = "";
		birthDate += selectedYear.toString();
		if (selectedMonth < 10) birthDate += "-0" + (selectedMonth + 1).toString();
		else birthDate += "-" + (selectedMonth + 1).toString();
		if (selectedDay < 10) birthDate += "-0" + selectedDay.toString();
		else birthDate += "-" + selectedDay.toString();
		return birthDate;
	}
	function getAge(birthDate) {
		return Math.floor(
			(new Date() - new Date(birthDate).getTime()) / 3.15576e10
		);
	}
	function handleSubmit() {
		const birthdate = zerosBehind();
		const age = getAge(birthdate);
		if (age < 16) {
			Alert.alert(
				"Sorry :(",
				"Due to legal stuff we can't store data from people younger than 16 years old."
			);
			return;
		}
		navigateToRegister(birthdate);
	}
	function goBack() {
		navigation.goBack();
	}

	let year = [];
	function renderYears() {
		const thisYear = new Date().getFullYear();
		for (let i = 1910; i <= thisYear; i++) {
			year.push(<Picker.Item label={i.toString()} value={i} key={i} />);
		}
	}
	renderYears();
	useEffect(() => {
		generateDays();
	}, [selectedMonth, selectedYear]);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={goBack}>
				<MaterialIcons name="arrow-back" size={28} />
			</TouchableOpacity>
			<StatusBar hidden />
			<View style={styles.centerText}>
				<Text style={styles.titleText}>Welcome to Scabere!</Text>
				<View styles={styles.centerText}>
					<Text style={styles.bodyText}>
						We need some information from you if you don't mind
					</Text>
					<Text style={styles.bodyText}>Let's start with your birth date</Text>
				</View>
			</View>
			<View style={styles.formContainer}>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={selectedDay}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
					>
						{days.map((item, index) => {
							return (
								<Picker.Item label={item.toString()} value={item} key={index} />
							);
						})}
					</Picker>
					<Picker
						selectedValue={selectedMonth}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => {
							setSelectedMonth(itemValue);
						}}
					>
						{months.map((item, index) => {
							return <Picker.Item label={item} value={index} key={index} />;
						})}
					</Picker>
					<Picker
						selectedValue={selectedYear}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) => {
							setSelectedYear(itemValue);
						}}
					>
						{year}
					</Picker>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						handleSubmit(selectedDay);
					}}
				>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
