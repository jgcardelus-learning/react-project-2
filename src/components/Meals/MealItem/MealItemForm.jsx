import { useRef, useState } from "react";
import styles from "./MealItemForm.module.css";

import Input from "../../UI/Input";

const MealItemForm = (props) => {
	const [amountValid, setAmountValid] = useState(true);

	const amountInputRef = useRef();

	const submitHandler = (event) => {
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 0 ||
			enteredAmountNumber > 5
		) {
			setAmountValid(false);
			return;
		}

		props.onAddItem(enteredAmountNumber);
	};

	return (
		<div className={styles.form}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button onClick={submitHandler}>Add to cart</button>
			{!amountValid && <p>Please enter a valid amount (1-5).</p>}
		</div>
	);
};

export default MealItemForm;
