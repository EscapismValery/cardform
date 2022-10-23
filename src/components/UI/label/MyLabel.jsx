import React from 'react';
import MyInput from '../input/MyInput';
import cl from './MyLabel.module.css';

const MyLabel = ({ title, input, change, oninput, errorBlur, errorFormat, errorBlank, ...props }) => {
	const onchange = (onchange) => {
		change(onchange);
	}
	return (
		<label htmlFor={input.name} className={cl.container}>
			<p className={cl.title}>{title}</p>
			<MyInput
				{...props}
				type={input.type}
				name={input.name}
				placeholder={input.placeholder}
				change={onchange}
				oninput={oninput}
				errorBlur={errorBlur}
				errorFormat={errorFormat}
				errorBlank={errorBlank}
			/>
		</label>
	)
}

export default MyLabel;