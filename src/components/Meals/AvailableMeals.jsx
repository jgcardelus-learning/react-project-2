import React, { useState, useCallback } from "react";
import styles from "./AvailableMeals.module.css";
import useRequest from "../../hooks/use-request";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect } from "react";

const AvailableMeals = (props) => {
	const {
		loading: requestLoading,
		hasError: requestHasError,
		sendRequest: fetchMeals,
	} = useRequest();
	const [meals, setMeals] = useState([]);
	const [error, setError] = useState();

	const parseLoadedMeals = useCallback((data) => {
		setMeals(data);
	}, []);

	useEffect(() => {
		console.log("Fetching meals");

		const url =
			"https://react-http-requests-7b79a-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

		const getMeals = (data) => {
			parseLoadedMeals(data);
		};

		const getMealsError = (message) => {
			setError(message);
		};

		fetchMeals({ url: url }, getMeals, getMealsError);
	}, [fetchMeals, parseLoadedMeals]);

	const mealsList = meals.map((meal) => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				price={meal.price}
				description={meal.description}
			/>
		);
	});

	return (
		<section className={styles.meals}>
			<Card>
				{!requestLoading && meals.length !== 0 && mealsList}

				{requestLoading && (
					<p>Loading meals. Hang in there just a sec</p>
				)}
				{requestHasError && <p>{error}</p>}

				{!requestLoading && !requestHasError && meals.length === 0 && (
					<p>No meals available.</p>
				)}
			</Card>
		</section>
	);
};

export default AvailableMeals;
