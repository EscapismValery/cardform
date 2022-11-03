import { useState } from 'react';
import { useForm } from "react-hook-form";
import './styles/App.css';
import './styles/mobile-app.css';

function App() {
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const {
		register,
		formState: {
			errors, isSubmitSuccessful
		},
		handleSubmit,
		reset,
	} = useForm({
		mode: "All"
	});

	const onSubmit = (data) => {
		alert("Name: " + data.cardname + `\r\n` +
			"Card number: " + data.cardnumber + `\r\n` +
			"Date: " + data.month + "/" + data.year + `\r\n` +
			"CVC: " + data.cvc)
		reset()
	}
	return (
		<div className="app">
			<div className="cardform">
				<div className="cardform__cards cards">
					<div className="cards__item item-front">
						<span className="cards__logo"></span>
						<div className="cards__number">
							<p>{number === "" ? "1234 5678 9123 0000" : number}</p>
						</div>
						<div className="cards__bottom">
							<span className="cards__name">{name === "" ? "Jane Appleseed" : name}</span>
							<span className="cards__date">{month === "" ? "00" : month}/{year === "" ? "00" : year}</span>
						</div>
					</div>
					<div className="cards__item item-back">
						<span className="cards__cvc">{cvc === "" ? "000" : cvc}</span>
					</div>
				</div>

				<div className="cardform__form">
					{isSubmitSuccessful
						? <div className='success'>
							<div className='success__okay'>
								<svg fill="none" stroke="#fff" strokeWidth="1.7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="4 13 9 18 20 7" /></svg>
							</div>
							<p className="success__thanks">Thank you!</p>
							<p className="success__text">We've added your card details</p>
							<button className='button'>Continue</button>
						</div>
						: <form onSubmit={handleSubmit(onSubmit)} className="form">
							<label htmlFor="cardname">
								<p className='form__title'>cardholder name</p>
								<input
									{...register('cardname', {
										required: "Can't be blank",
										pattern: {
											value: /[A-Za-zА-Яа-я]\s[A-Za-zА-Яа-я]/g,
											message: "Wrong format"
										},
										onChange: (e) => {
											setName(e.target.value)
										},

									})}
									className={errors?.cardname && "form__input error-border" || "form__input"}
									type="text"
									name="cardname"
									id='cardname'
									placeholder='e.g. Jane Appleseed'
									maxLength={"23"}
									onInput={e => {
										const value = e.target.value;
										e.target.value = value.replace(/[0-9]/, "");
									}}
								/>
							</label>
							{errors?.cardname && <div className='error'>{errors?.cardname?.message || "Wrong format"}</div>}

							<label htmlFor="cardnumber">
								<p className='form__title'>card number</p>
								<input
									{...register('cardnumber', {
										required: "Can't be blank",
										minLength: {
											value: 19,
											message: "Wrong format"
										},
										onChange: (e) => setNumber(e.target.value)
									})}
									className={errors?.cardnumber && "form__input error-border" || "form__input"}
									type="text"
									name="cardnumber"
									placeholder='e.g. 1234 5678 9123 0000'
									maxLength={"19"}
									onInput={e => {
										const value = e.target.value;
										e.target.value = value.replace(/\D/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
									}}
								/>
							</label>
							{errors?.cardnumber && <div className='error'>{errors?.cardnumber?.message || "Wrong format"}</div>}

							<div className="form__datecvc">
								<div className="form__date">
									<p className="form__title">exp. date (mm/yy)</p>
									<div className="form__date-container">
										<label htmlFor="month">
											<input
												{...register('month', {
													required: "Can't be blank",
													minLength: {
														value: 2,
														message: "Wrong format"
													},
													onChange: (e) => setMonth(e.target.value)
												})}
												className={errors?.month && "form__input error-border" || "form__input"}
												type="text"
												name="month"
												placeholder='MM'
												maxLength={"2"}
												onInput={e => {
													const value = e.target.value;
													e.target.value = value.replace(/[^0-1+]/g, "")
												}}
											/>
										</label>
										<label htmlFor="year">
											<input
												{...register('year', {
													required: "Can't be blank",
													minLength: {
														value: 2,
														message: "Wrong format"
													},
													onChange: (e) => setYear(e.target.value)
												})}
												className={errors?.year && "form__input error-border" || "form__input"}
												type="text"
												name="year"
												placeholder='YY'
												maxLength={"2"}
												onInput={e => {
													const value = e.target.value;
													e.target.value = value.replace(/\D/g, "")
												}}
											/>
										</label>
									</div>
									<div className='form__date-error'>
										<div className='form__date-error-item'>
											{errors?.month && <div className='error'>{errors?.month?.message || "Wrong format"}</div>}
										</div>
										<div className='form__date-error-item'>
											{errors?.year && <div className='error'>{errors?.year?.message || "Wrong format"}</div>}
										</div>
									</div>
								</div>

								<div className='form__cvc'>
									<label htmlFor="cvc">
										<p className='form__title'>cvc</p>
										<input
											{...register('cvc', {
												required: "Can't be blank",
												minLength: {
													value: 3,
													message: "Wrong format"
												},
												onChange: (e) => setCvc(e.target.value)
											})}
											className={errors?.cvc && "form__input error-border" || "form__input"}
											type="text"
											name="cvc"
											placeholder='e.g. 123'
											maxLength={"3"}
											onInput={e => {
												const value = e.target.value;
												e.target.value = value.replace(/\D/g, "")
											}}
										/>
									</label>
									{errors?.cvc && <div className='error'>{errors?.cvc?.message || "Wrong format"}</div>}
								</div>
							</div>
							<input
								type="submit"
								value="Confirm"
								className="button"
							/>
						</form>}
				</div>
			</div>
		</div >
	);
}

export default App;
