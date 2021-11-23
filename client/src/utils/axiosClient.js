import axios from "axios";
import * as Config from '../constants/Config';

const token = localStorage.getItem('access_token');

const axiosClient = axios.create({
    baseURL: `${Config.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

// Interceptor
// Add a request interceptorLis
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        window.location.href = '/error';
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data

		console.log('data is', response);
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		console.log('error', error.response);
		try {
			const { config, status, data } = error.response;
			console.log({ config, status, data })

			if (config.url === '/auth/register' && status === 400) {
				const errorMessage = data.message;

				window.location.href = '/error';
				//throw new Error(errorMessage);
			}
		} catch (ex) {
			console.log('error', ex);
			window.location.href = '/error';
		}
		return Promise.reject(error);
	}
);

export default axiosClient;