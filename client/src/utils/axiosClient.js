import axios from "axios";
import queryString from 'query-string';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWI4YTI3MzE4NDRjOTg0OGQ4NjA3MTQzNDFlYzQxYjhhYzM5NTBmZWE2OTJkYTM2OTg4YTk0ZjU4N2FiNmU3MzFmYjQ2MWExODBmMjE5NWQiLCJpYXQiOjE2NDAwNzk1MDMsIm5iZiI6MTY0MDA3OTUwMywiZXhwIjoxNjcxNjE1NTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.NHVl0xgFDFyqSoNTW1BXGD2iI26qzXdLKQKtSqhmOxG-oO1vUzPUQA5PGHBm9lkkZCizd2vFo5-SPfj30JVnsX_7v1rfA0-uTIh_yLgDhVogeOXkrJXvZvmQwf3CxcszyJYSeUAGsjisi0yP0fd9Nh2yHvG8gGbTUmJrb9MYt4YfOLYpIzZFwNoPFcMwgxWrLYC7Oex0cO4W_EOhnE6lrfJ8NrrPEZraWm3OPGE1YDkkLAcFiACh52U7YeLUMtSHNtVLx18ZBJIC8L5JEXmk1sq0kafNff-yH58B0m6Sl11F7yL7O1IEt97bR44TYWt4ADBrbX2BKJvmBOlwy1NZtTxt4anp2he27YwfILVqfg7lVAibjHsn_xAZXvwpgEI6t4RWHzX_vVyYhtEu_rygqHXMDIxYbea3xzieMp1Wn4l5dpxP_Svi20R95NSZOWZ_F9Kox1N8HI3wHah_8SS8XbWiYCjsLHmtGOYsioq8XNhd1uXNQwKOipioAUF29VnQkXaq1M8ZwPl90I1qOwpQl47CFSSkGYXg7FnTMqePQfSWHwgTkXMvSGLKn47DbaO4rtWLJBmhDK_e0sfxbvshJTzRhk12NtNGWnnmSrTjOnbfeXX0SzDLVHFi7ZdTah7fsV6JiFgwkVRlyH_sc9-WeyjaG6KleTWFcV93Z3y_8CU';
// const token = localStorage.getItem('access_token');


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL_LIVE,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
	paramsSerializer: params => queryString.stringify(params)
});

// Interceptor
// Add a request interceptorLis
axiosClient.interceptors.request.use(
	async (config) => {
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