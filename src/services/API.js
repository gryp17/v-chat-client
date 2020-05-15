import axios from 'axios';
import errorsMap from '@/filters/errorsMap';

const API = axios.create({
	withCredentials: true
});

//intercept all responses
API.interceptors.response.use((res) => {
	if (res.data && res.data.apiError) {
		//trigger an exception if there is an API error
		return Promise.reject(res.data.apiError);
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

export default API;
