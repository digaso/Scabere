import React, { useEffect, useRef, useState } from "react";

import { TextInput, Text } from "react-native";
import { useField } from "@unform/core";
import { StyleSheet } from "react-native";

function Input({
	name,
	label,
	style,
	type,
	value,
	colorplaceholder,
	multiline,
	focus,
	stylesinput,
	numberoflines,
	...rest
}) {
	const inputRef = useRef(null);

	const { fieldName, registerField, defaultValue, error } = useField(name);
	if (value == undefined) {
		value = "";
	}
	useEffect(() => {
		inputRef.current.value = defaultValue;
	}, [defaultValue]);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: "value",
			clearValue(ref) {
				ref.value = "";
				ref.clear();
			},
			setValue(ref, value) {
				ref.setNativeProps({ text: value });
				inputRef.current.value = value;
			},
			getValue(ref) {
				return ref.value;
			},
		});
	}, [fieldName, registerField]);
	let keyboardtype;
	let ispassword = false;
	switch (type) {
		case "email":
			keyboardtype = "email-address";
			break;
		case "password":
			ispassword = true;
		default:
			keyboardtype = "default";
			break;
	}
	let color;
	if (!colorplaceholder) {
		color = "#ccc";
	} else {
		color = colorplaceholder;
	}
	let inputstyle;
	if (!stylesinput) inputstyle = styles.input;
	else inputstyle = stylesinput;

	return (
		<>
			<TextInput
				multiline={multiline ? multiline : false}
				style={inputstyle}
				ref={inputRef}
				numberOfLines={numberoflines ? numberoflines : 1}
				secureTextEntry={ispassword}
				keyboardAppearance="dark"
				keyboardType={keyboardtype}
				defaultValue={value}
				placeholder={label}
				placeholderTextColor={color}
				onChangeText={(value) => {
					if (inputRef.current) {
						inputRef.current.value = value;
					}
				}}
				autoFocus={focus}
				{...rest}
			/>
		</>
	);
}
const styles = new StyleSheet.create({
	input: {
		borderBottomColor: "#111",
		borderBottomWidth: 1,
		height: 40,
		width: 160,
		textAlign: "center",
	},
});
export default Input;
