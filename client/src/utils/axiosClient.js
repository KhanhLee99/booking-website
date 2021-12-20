import axios from "axios";
import queryString from 'query-string';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2JhZWRiYjEyMmJmZTUwMzk5ZTcyNjFjNTUwYjVlMmI5ZDQ1YTg2NTBiMmUzMjRlOWZjMzhlMWYyNmMyMTRkZjRlMTRjMzE0MDkwM2VlOTIiLCJpYXQiOjE2NDAwMjkwNTYsIm5iZiI6MTY0MDAyOTA1NiwiZXhwIjoxNjcxNTY1MDU2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.XLwwg-yuocPe6776ejUbkerEzV4-S9i6PYUGHn8aMDULr8L56iIpw-iH6hfeolQ5MwuabARWo9FGMyTw-6BMZIL8dUQJU-rCP97wQAIqF4GLga9kd9fKewr7n4L1HyJ7WKXX5xLHjf87DGTbHNNu6_IRCUK2W5M6Jld58V6CZ0QQz4qZ7PZdrram9uUXHT2e4lEJ6ryXvuXul7IhCn_zHevkVgAL_hoicUg-H0bLolaIKbOTRlXKfh3yWxSI0X8BidUaAsw3vUf8sc-CYgw5tgQX9d8Egp26UXFySAhFwb5dz01JjAGV6oBp8KctjYcrNqxzuZRfn2RF-odzdqfJHm9rcySmRuAaZpzINiUP4jAuCjH6Jcjfjve1knIXnw543ZXAoPiQQO7w2E7byLqVuSFSIGW4X0eIfto7eWRdf9QyAJZk1qf-LNyrTREQ33u0YCYeyPeLoPFae_D4gcN7yqvmcj2ZbBxmPC4JECwYftPwu6YNl6ECVoOex4CtOQ6jn0HK_zy7B_4hYP_TT6gv8qyU_FAiDVVK8tGRpmy5tMZdxyxVQxN4T81s1bSCl_8GvofZu-6wPfWvXgHlKxbmrxq-Fqe_iCR2D4wQoBdLs1KzSSMSpYtawF1WFYOhtGzpVVaOaFZVf5KfUNXmGdA7aiwZqoFlL1xa70huAx_v8e4';
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