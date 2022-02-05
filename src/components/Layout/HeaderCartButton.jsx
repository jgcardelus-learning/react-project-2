import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const cartContext = useContext(CartContext);

	const totalCartItems = cartContext.items.reduce((total, item) => {
		return total + item.amount;
	}, 0);

	const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
	useEffect(() => {
		if (cartContext.items.length === 0) {
			return;
		}

		setButtonIsHighlighted(true);
		let timer = setTimeout(() => {
			setButtonIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartContext]);

	let buttonClasses = `${styles.button} ${
		buttonIsHighlighted ? styles.bump : ""
	}`;

	return (
		<button className={buttonClasses} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>
				<p>Your cart</p>
			</span>
			<span className={styles.badge}>{totalCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
