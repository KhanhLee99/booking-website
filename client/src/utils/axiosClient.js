import axios from "axios";
import queryString from 'query-string';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWQ2NjRkNGIyYWVhNGE3OGM0NWQ5ODZmZmEzYmRhOGFlMzU2Mzk2NzVhZjVjNmUyZDhmNGYyZTZiYzMyZDFiNzczZjRhMDg4NDYzZWZlOTMiLCJpYXQiOjE2NDE0NzgwOTgsIm5iZiI6MTY0MTQ3ODA5OCwiZXhwIjoxNjczMDE0MDk4LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.OyO5HfLVRaBx1DMOmbwxCcXK03opUUW7ZpQEgynfPQ71IZMO50uVzYHfzZRLs7l0iySBF-Tfua4yvd5-BSOmMZxCdOmlqvembqNC2z17jnMsUb3pWW0fsoLPFyrvrUrb2pe-W4Y46dU6J7BfHm974beXarYbuBkiWaV7wd87T2roJdTtncV1cHHK2UYulU24YJB_pT_aGJjpYhoDEBRjOs9ppTylkMv_GoiXTca7dOu9E9VQm5DaJ-ZUJDXDOTfDUcjZ8teXXei5P9wWnUWPXxmJ2GB5oLxyDbuvG55sTo8b6zj6WZYFPf7T_gx8PpLDwg3X9-JbFs5QyEQhcI_G1MrKwJd7E9mixj1jnN70eIgrKLR-e8VktJNIdfAAjGSPD3Himi0PRD5hRmUZU5oduIgqwBCOUFedLvI2-jtqtyJysYTVk4WSJJ8djLIfdvmeA0QQ1focCoSSB0d8mO2JW0-e5PQEaFzj1tJ5VBFbuOcdjG9giOeWXqaQJ70wlx_MffvFvHKj9ydVwYFWNPozKSVcuMqPq1gpQUklKch1x190sWsIg54x7lAIz0fiKvRJNE0fVRzaMxMBR-PwBfevfXgY8TfzfPDOzxMquNpADW7_U7IdoA914s0m2GTOUVZPxjut5jhLOdFBrvyO30wB7k9rr6LCMurZOjMJyZaFGM4';
const token = localStorage.getItem('access_token');


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
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