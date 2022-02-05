import React from "react";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
	const confirmHandler = (event) => {
		event.preventDefault();
		console.log("Submitting");
	};

	return (
		<form onSubmit={confirmHandler} className={styles.form}>
			<div className={styles.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" name="name" id="name" />
			</div>
			<div className={styles.control}>
				<label htmlFor="street">Street</label>
				<input type="text" name="street" id="street" />
			</div>
			<div className={styles.control}>
				<label htmlFor="postal">Postal</label>
				<input type="text" name="postal" id="postal" />
			</div>
			<div className={styles.control}>
				<label htmlFor="city">city</label>
				<input type="text" name="city" id="city" />
			</div>

			<div className={styles.actions}>
				<button onClick={props.onCancelCheckout} type="button">
					Close
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
