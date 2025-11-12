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
	const API_BASE_URLS = `${API_BASE_URL}${endpoint}`;
	const headers = {
		'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
	};

	const accessToken = Cookies.get('accessToken');
	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const options = {
		method,
		url: API_BASE_URLS,
		headers,
		data: method !== 'GET' ? data : undefined,
	};

	for (let i = 0; i < retries; i++) {
		try {
			const response = await axios.request(options);
			return response?.data;
		} catch (error) {
			if (error.response) {
				const { status, data, headers } = error.response;

				if (status === 401) {
					Cookies.remove('accessToken');
					return {
						isError: true,
						data: 'Unauthorized access. Redirecting to login.',
						status: 401,
					};
				}

				if (status === 404) {
					return { isError: true, data: 'Not Found' };
				}
				if (status === 429) {
					const retryAfter = parseInt(headers['retry-after'], 10) || backoff * 2 ** i;
					if (i < retries - 1) {
						await new Promise((res) => setTimeout(res, retryAfter));
						continue;
					} else {
						return {
							isError: true,
							data: 'Too Many Requests: Please try again later.',
						};
					}
				}
				return { isError: true, data };
			} else {
				console.error('Network error:', error);
				return {
					isError: true,
					data: "We can't process your request at this time. Please try later.",
				};
			}
		}
	}
};

export default fetchHandler;


