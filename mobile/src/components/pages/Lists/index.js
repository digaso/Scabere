import React, { useEffect, useState } from "react";
import { Animated, View, Text, StatusBar, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

export default function Lists({ route, navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ScrollView showsHorizontalScrollIndicator={false}>
				<View style={styles.list}>
					<Text style={styles.listText}>Projeto da Escola</Text>
					<View style={styles.bottomListContainer}>
						<View style={styles.dateContainer}>
							<MaterialIcons name="event" size={25} />
							<Text style={styles.dateText}>Tomorrow</Text>
						</View>
						<Text style={styles.taskText}>11 Tasks</Text>
					</View>
				</View>
				<View style={styles.list}>
					<Text style={styles.listText}>Projeto da Escola</Text>
					<View style={styles.bottomListContainer}>
						<View style={styles.dateContainer}>
							<MaterialIcons name="event" size={25} />
							<Text style={styles.dateText}>Tomorrow</Text>
						</View>
						<Text style={styles.taskText}>11 Tasks</Text>
					</View>
				</View>
				<View style={styles.list}>
					<Text style={styles.listText}>Projeto da Escola</Text>
					<View style={styles.bottomListContainer}>
						<View style={styles.dateContainer}>
							<MaterialIcons name="event" size={25} />
							<Text style={styles.dateText}>Tomorrow</Text>
						</View>
						<Text style={styles.taskText}>11 Tasks</Text>
					</View>
				</View>
				<View style={styles.list}>
					<Text style={styles.listText}>Projeto da Escola</Text>
					<View style={styles.bottomListContainer}>
						<View style={styles.dateContainer}>
							<MaterialIcons name="event" size={25} />
							<Text style={styles.dateText}>Tomorrow</Text>
						</View>
						<Text style={styles.taskText}>11 Tasks</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
