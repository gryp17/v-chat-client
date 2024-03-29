import axios from 'axios';
import errorsMap from '@/filters/errorsMap';

const API = axios.create({
	withCredentials: true
});

//intercept all responses
API.interceptors.response.use((res) => {
	if (res.data && res.data.apiError) {
		//trigger an exception if there is an API error
		return Promise.reject(errorsMap(res.data.apiError));
	}

	//translate the error codes into actual error messages
	if (res.data && res.data.errors) {
		Object.keys(res.data.errors).forEach((field) => {
			const error = res.data.errors[field];
			res.data.errors[field] = errorsMap(error);
		});
	}

	return res;
});

/**
 * Sets the axios authentication token
 * Not used anymore
 * @param {String} token
 */
export function setApiToken(token) {
	API.defaults.headers.common.token = token;
}

/**
 * Sets the axios base url
 * @param {String} baseURL
 */
export function setApiBaseURL(baseURL) {
	API.defaults.baseURL = baseURL;
}

export default API;
