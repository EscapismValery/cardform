import React, { useState } from 'react';
import cl from "./MyInput.module.css";

const MyInput = ({ change, oninput, errorBlur, errorFormat, errorBlank, ...props }) => {
	const [state, setState] = useState("");
	const [formatName, setFormatName] = useState("Wrong format");
	const [formatNumber, setFormatNumber] = useState("Wrong format");
	const [blankName, setBlankName] = useState("Can't be blank");
	const [blankNumber, setBlankNumber] = useState("Can't be blank");

	const normalizeCardNumber = (value) => {
		change(value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "")
	}
	const onfocus = (e) => {
		e.target.classList.add(cl.focus);

	}
	const onchange = (e) => {
		oninput === "number" ? setState(normalizeCardNumber(e.target.value)) : setState(change(e.target.value))
		switch (e.name) {
			case "cardname":
				// { e.value ? setBlankName("") : setBlankName("Can't be blank") }
				// { e.value.match(/[A-Za-zА-Яа-я]\s[A-Za-zА-Яа-я]/g) ? setFormatName("") : setFormatName("Wrong format") }
				// console.log(blankName);
				// errorBlank(blankName)
				// errorFormat(formatName)
				break
			case "cardnumber":
				// { e.value ? setBlankNumber("") : setBlankNumber("Can't be blank") }
				// { e.value.length === 19 ? setFormatNumber("") : setFormatNumber("Wrong format") }
				break
			case "mouth" && "year":
				// { e.value ? setBlank("") : setBlank("Can't be blank") }
				// { e.value.length === 2 ? setFormat("") : setFormat("Wrong format") }
				break
			case "cvc":
				// { e.value ? setBlank("") : setBlank("Can't be blank") }
				// { e.value.length === 3 ? setFormat("") : setFormat("Wrong format") }
				break
		}
	}
	const onblur = (e) => {
		if (!e.target.value) {
			e.target.classList.remove(cl.focus);
		}
		errorBlur(e.target);
	}

	return (
		<input
			{...props}
			value={state}
			onChange={e => {
				onchange(e)
			}}
			onFocus={e => { onfocus(e) }}
			onBlur={e => { onblur(e) }}
			className={cl.myInput}
			onInput={e => {
				const value = e.target.value;
				switch (oninput) {
					case "number": {
						e.target.value = value.replace(/\D/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
						break;
					}
					case "text": {
						e.target.value = value.replace(/[0-9]/, "")
						break;
					}
				}
			}}
		/>

	)
}

export default MyInput;