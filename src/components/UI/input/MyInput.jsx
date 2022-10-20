import React, { useState } from 'react';
import cl from "./MyInput.module.css";

const MyInput = ({ change, oninput, ...props }) => {
	const [state, setState] = useState("");
	const normalizeCardNumber = (value) => {
		change(value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "")
	}
	const onfocus = (e) => {
		e.target.classList.add(cl.focus);

	}
	const onblur = (e) => {
		if (!e.target.value) {
			e.target.classList.remove(cl.focus);
		}
	}

	return (
		<input
			{...props}
			value={state}
			onChange={e => {
				oninput === "number" ? setState(normalizeCardNumber(e.target.value)) : setState(change(e.target.value))
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