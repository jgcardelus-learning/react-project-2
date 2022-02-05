import React from "react";
import styles from "./Header.module.css";
import foodImage from "../../assets/sushi.jpeg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
	return (
		<React.Fragment>
			<header className={styles.header}>
				<h1>This is not a food app!</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={styles["main-image"]}>
				<img src={foodImage} alt="Sorry it did't fucking load" />
			</div>
		</React.Fragment>
	);
};

export default Header;
