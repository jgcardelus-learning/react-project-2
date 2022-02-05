import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const totalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartIndex];

		let updatedItems;
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		return { items: updatedItems, totalAmount: totalAmount };
	} else if (action.type === "REMOVE") {
		const existingCartIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingCartItem = state.items[existingCartIndex];
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};

			let updatedItems;
			let updatedTotalAmount;
			if (updatedItem.amount === 0) {
				updatedItems = state.items.filter(
					(item) => item.id !== action.id
				);
				updatedTotalAmount = state.totalAmount - existingCartItem.price;
			} else {
				updatedItems = state.items;
				updatedItems[existingCartIndex] = updatedItem;
				updatedTotalAmount = state.totalAmount - updatedItem.price;
			}
			return { items: updatedItems, totalAmount: updatedTotalAmount };
		}
	}
	return initialCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartState] = useReducer(
		cartReducer,
		initialCartState
	);

	const addItemHandler = (item) => {
		dispatchCartState({
			type: "ADD",
			item: item,
		});
	};

	const removeItemHandler = (id) => {
		dispatchCartState({
			type: "REMOVE",
			id: id,
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
