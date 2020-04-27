import axios from 'axios';
//import errorsMap from '@/filters/errorsMap';

const API = axios.create({
	withCredentials: true
});

//intercept all responses
API.interceptors.response.use((res) => {
	if (res.data && res.data.apiError) {
		//trigger an exception if there is an API error
		return Promise.reject(res.data.apiError);
	}

	//TODO: translate the error code into error string

	return res;
});

export default API;
