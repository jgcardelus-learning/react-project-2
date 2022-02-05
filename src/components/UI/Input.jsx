import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
	props.input.type =
		props.input.type === undefined ? "text" : props.input.type;

	return (
		<div className={styles.input}>
			{props.label && (
				<label htmlFor={props.input.id}>{props.label}</label>
			)}
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;
