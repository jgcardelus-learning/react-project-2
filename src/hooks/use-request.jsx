import { useCallback, useState } from "react";

const useRequest = () => {
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const sendRequest = useCallback(async (params, callback, error) => {
		try {
			setHasError(false);
			setLoading(true);

			const request = await fetch(params.url, {
				method: params.method ? params.method : "GET",
				body: params.body ? JSON.stringify(params.body) : null,
				headers: params.headers ? params.headers : {},
			});

			if (!request.ok) {
				throw new Error("Data couldn't load.");
			}

			const data = await request.json();

			setLoading(false);
			callback(data);
		} catch (requestError) {
			setLoading(false);
			setHasError(true);

			error(requestError.message);
		}
	}, []);

	return {
		loading,
		hasError,
		sendRequest,
	};
};

export default useRequest;
