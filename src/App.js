import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyButton from './components/UI/button/MyButton';
import MyLabel from './components/UI/label/MyLabel';
import './styles/App.css';

function App() {
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [mouth, setMouth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");
	const { register, handleSubmit } = useForm();

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

	const onSubmit = (data) => {

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
					<form onSubmit={handleSubmit(onSubmit)} className="form">
						<MyLabel
							title={"cardholder name"}
							input={{ type: "text", name: 'cardname', placeholder: 'e.g. Jane Appleseed' }}
							change={changeName}
							oninput={"text"}
							maxLength={"23"}
						/>
						<MyLabel
							title={"card number"}
							input={{
								type: "text", name: 'cardnumber', placeholder: 'e.g. 1234 5678 9123 0000',
							}}
							change={changeNumber}
							oninput={"number"}
							maxLength={"16"}
						/>
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
									/>
									<MyLabel
										title={""}
										input={{ type: "text", name: 'year', placeholder: 'YY' }}
										change={changeYear}
										oninput={"number"}
										maxLength={"2"}
									/>
								</div>
							</div>
							<MyLabel
								title={"cvc"}
								input={{ type: "text", name: 'cvc', placeholder: 'e.g. 123' }}
								change={changeCvc}
								oninput={"number"}
								maxLength={"3"}
							/>
						</div>
						<MyButton>Confirm</MyButton>
					</form>
				</div>
			</div>
		</div >
	);
}

export default App;
