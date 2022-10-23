import { useState } from 'react';
import MyButton from './components/UI/button/MyButton';
import MyLabel from './components/UI/label/MyLabel';
import './styles/App.css';

function App() {
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [mouth, setMouth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const changeNumber = (num) => {
		setNumber(num);
	}
	const changeName = (num) => {
		setName(num);
	}
	const changeMouth = (num) => {
		setMouth(num);
	}
	const changeYear = (num) => {
		setYear(num);
	}
	const changeCvc = (num) => {
		setCvc(num);
	}

	const [nameError, setNameError] = useState(false);
	const [numberError, setNumberError] = useState(false);
	const [monthError, setMonthError] = useState(false);
	const [yearError, setYearError] = useState(false);
	const [cvcError, setCvcError] = useState(false);

	const [formatName, setFormatName] = useState("Wrong format");
	const [blankName, setBlankName] = useState("Can't be blank");
	const [formatNumber, setFormatNumber] = useState("Wrong format");
	const [blankNumber, setBlankNumber] = useState("Can't be blank");
	const [formatMonth, setFormatMonth] = useState("Wrong format");
	const [blankMonth, setBlankMonth] = useState("Can't be blank");
	const [formatYear, setFormatYear] = useState("Wrong format");
	const [blankYear, setBlankYear] = useState("Can't be blank");
	const [formatCvc, setFormatCvc] = useState("Wrong format");
	const [blankCvc, setBlankCvc] = useState("Can't be blank");

	const blurHandler = (e) => {
		switch (e.name) {
			case "cardname":
				setNameError(true)
				{ e.value ? setBlankName("") : setBlankName("Can't be blank") }
				{ e.value.match(/[A-Za-zА-Яа-я]\s[A-Za-zА-Яа-я]/g) || !e.value ? setFormatName("") : setFormatName("Wrong format") }
				break
			case "cardnumber":
				setNumberError(true)
				{ e.value ? setBlankNumber("") : setBlankNumber("Can't be blank") }
				{ e.value.length === 19 || !e.value ? setFormatNumber("") : setFormatNumber("Wrong format") }
				break
			case "mouth":
				setMonthError(true)
				{ e.value ? setBlankMonth("") : setBlankMonth("Can't be blank") }
				{ e.value.length === 2 || !e.value ? setFormatMonth("") : setFormatMonth("Wrong format") }
				break
			case "year":
				setYearError(true)
				{ e.value ? setBlankYear("") : setBlankYear("Can't be blank") }
				{ e.value.length === 2 || !e.value ? setFormatYear("") : setFormatYear("Wrong format") }
				break
			case "cvc":
				setCvcError(true)
				{ e.value ? setBlankCvc("") : setBlankCvc("Can't be blank") }
				{ e.value.length === 3 || !e.value ? setFormatCvc("") : setFormatCvc("Wrong format") }
				break
		}
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
							<span className="cards__date">{mouth === "" ? "00" : mouth}/{year === "" ? "00" : year}</span>
						</div>
					</div>
					<div className="cards__item item-back">
						<span className="cards__cvc">{cvc === "" ? "000" : cvc}</span>
					</div>
				</div>
				<div className="cardform__form">
					<form className="form">
						<MyLabel
							title={"cardholder name"}
							input={{ type: "text", name: 'cardname', placeholder: 'e.g. Jane Appleseed' }}
							change={changeName}
							oninput={"text"}
							maxLength={"23"}
							errorBlur={blurHandler}
							errorFormat={setFormatName}
							errorBlank={setBlankName}
						/>
						{(nameError && formatName) && <div className='error'>{formatName}</div>}
						{(nameError && blankName) && <div className='error'>{blankName}</div>}
						<MyLabel
							title={"card number"}
							input={{
								type: "text", name: 'cardnumber', placeholder: 'e.g. 1234 5678 9123 0000',
							}}
							change={changeNumber}
							oninput={"number"}
							maxLength={"19"}
							errorBlur={blurHandler}
						/>
						{(numberError && formatNumber) && <div className='error'>{formatNumber}</div>}
						{(numberError && blankNumber) && <div className='error'>{blankNumber}</div>}
						<div className="form__datecvc">
							<div className="form__date">
								<p className="form__title">exp. date (mm/yy)</p>
								<div className="form__date-container">
									<MyLabel
										title={""}
										input={{ type: "text", name: 'mouth', placeholder: 'MM', }}
										change={changeMouth}
										oninput={"number"}
										maxLength={"2"}
										errorBlur={blurHandler}
									/>
									<MyLabel
										title={""}
										input={{ type: "text", name: 'year', placeholder: 'YY' }}
										change={changeYear}
										oninput={"number"}
										maxLength={"2"}
										errorBlur={blurHandler}
									/>
								</div>
								<div className='form__date-error'>
									<div className='form__date-error__month'>
										{(monthError && formatMonth) && <div className='error'>{formatMonth}</div>}
										{(monthError && blankMonth) && <div className='error'>{blankMonth}</div>}
									</div>
									<div className='form__date-error__month'>
										{(yearError && formatYear) && <div className='error'>{formatYear}</div>}
										{(yearError && blankYear) && <div className='error'>{blankYear}</div>}
									</div>
								</div>
							</div>
							<div className='form__cvc'>
								<MyLabel
									title={"cvc"}
									input={{ type: "text", name: 'cvc', placeholder: 'e.g. 123' }}
									change={changeCvc}
									oninput={"number"}
									maxLength={"3"}
									errorBlur={blurHandler}
								/>
								{(cvcError && formatCvc) && <div className='error'>{formatCvc}</div>}
								{(cvcError && blankCvc) && <div className='error'>{blankCvc}</div>}
							</div>
						</div>
						<MyButton>Confirm</MyButton>
					</form>
				</div>
			</div>
		</div >
	);
}

export default App;
