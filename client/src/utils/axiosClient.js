import axios from "axios";
import queryString from 'query-string';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmQwNWEyMGE3ZDQyN2QyMTdlNWMyMzE4Yjc2MmNlNDM4MzQzOTgwNmNlMjBmMmE4YjJhNTkxZWRkZTkxZTU2Y2EwYzFmYWJkZTc4MGYyN2IiLCJpYXQiOjE2NDA5MzE5ODEsIm5iZiI6MTY0MDkzMTk4MSwiZXhwIjoxNjcyNDY3OTgxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.s_DDrrauGIxlsUZ37a1JHSEpgjABlfpASvY55LU3PJXpvGEUwxa7q3vt6hOQZC41HyqUy-t1_L7wI_zuuq9HACTs2Q-t7WUf-Xry6LpemReoFx2YpYJhpLn2Lc59IkiDGFHJcbSjuLvP2Y6aVwavRECblspdgUz3ig8zws5iyu8Bb-eok4e3UBrzk6WWEYFwjRShOD1OMEW4i31ThZ7yJDlPs6W1oYrdWnJtVsI35kqQfNXDPVieSWFXT06UwLe0cOnQkmQkLT-q2chUmlcmBu4upVKPyLhWUypkdtfI-S2xC2nMS7bVtCd1dZwBCMXmYZzgS8rcf3eD9sqRl1kOjIW0EsEdn69998fhrnZPiDRJ_6E7Ye5R5GdYYP-83F6sfzYqnolF-Uvi5uSrOdQNCLwZzxegiDBplQ5J9Q3y1yLxOa2jGZ2ITltwS2a2ypJ_5eXkD4sI_W8zXdxRpWVLiG-4b3jZJPr1wRSPzYcnkvQRwoPVnr5KmJHHkHO4JAkOcvXTjg0UI_bN7lLwXqNH7qMYpYisxpSPB37ObINkFAiFVAWjVfoL72cFkNTNh1quE5nu6IKcwleJy9ph8Z3wl0b1PgLlgymjGwo93zlxePmzLy1oYx37mRDmSOQBRWQUAjLAC3-FecavDGcKox3CeEvShXMXQdkv_rTdvF-QMMQ';
// const token = localStorage.getItem('access_token');


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL_LIVE_API,
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