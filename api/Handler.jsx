import { API_BASE_URL } from '../src/app/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

const fetchHandler = async ({
	method,
	endpoint,
	data,
	isFormData = false,
	retries = 3,
	backoff = 300,
}) => {

	const url = `${API_BASE_URL}${endpoint}`;

	const headers = {
		'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
	};

	const accessToken = Cookies.get('accessToken');
	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	
	const options = {
		method,
		url,
		headers,
		data: method !== 'GET' ? data : undefined,
	};

	for (let i = 0; i < retries; i++) {
		try {
			const response = await axios.request(options);
			return response?.data;

		} catch (error) {
			if (!error.response) {
				console.error("Network error:", error);
				return {
					isError: true,
					data: "Network error. Please try again later."
				};
			}

			const { status, data, headers } = error.response;

			if (status === 401) {
				if (!localStorage.getItem("handled401")) {
					localStorage.setItem("handled401", "true");

					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					Cookies.remove("accessToken");
					Cookies.remove("refreshToken");
					alert("Your session has expired. Please log in again.");
					window.location.href = "/";
				}
				return { isError: true, data: "Unauthorized" };
			}

			if (status === 404) {
				return { isError: true, data: "Not Found" };
			}

			if (status === 429) {
				const retryAfter = parseInt(headers["retry-after"], 10) || backoff * 2 ** i;

				if (i < retries - 1) {
					await new Promise((res) => setTimeout(res, retryAfter));
					continue;
				}

				return {
					isError: true,
					data: "Too Many Requests. Try again later."
				};
			}
			return { isError: true, data };
		}
	}
};

export default fetchHandler;
