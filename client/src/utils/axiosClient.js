import axios from "axios";
import queryString from 'query-string';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyOGQ4NDFhZjE3NmEzNmFkMzlmZTliZmEzMjA0Y2U1NGM0YjU4MzIwNTEzNmFjZWIyMWJhMmZlOGY4ZTYwNzVlZTQ3OTNjNDQzOGRjNTIiLCJpYXQiOjE2NDIzNDAwNjIsIm5iZiI6MTY0MjM0MDA2MiwiZXhwIjoxNjczODc2MDYyLCJzdWIiOiIyMCIsInNjb3BlcyI6W119.oJpLNwprU5nYkf9G7atcfBA2bCoLf6ZKRoyrNFQHVvSDWNBKSGUUAdRR6uI6Dpdq61f15awbx-jhpCzw3YHl-Bo04lLxJMctvwW7mHtPxuUQTe3QE7q_td6TL3QXZ0nAQWsPNj3D9wRZ9RPza04kL-1mU5dGpb26e069PF7DmOWRnKth0QtdcmMtDva1msunJxxK0DTAPEgSyTOKFCK8RWVxrNTlEY_RsUdADUoXpgd0sA42NV_cht5VqlfFOHNW53EisXdnGZ6MqBgb7B2N_2aZxC_2t4mFfOxGYmO45ccViYLG9ztglMf7PmoTurpuINWI2xWHB49yF2OnOcOMMyOwQ6Sn3-UT6LRKyEO6MvMv1L8UFs94_PQ0KPyhI0F-n1tv-nA3ehxuVHngH4M_oOuCJeAOdX6U9fQunyu1UBOjoqgDo3K67BM-W9s4Axq3A5ek4TnBoqsp5d0dIh4GAyuKZNxCLSkAlr6UhjhU1NhxeqTulATXHbSsJX9BgO1Q_uYhFd5ydAExUncBvEYb1gR-WF2z3ZYQzqX1K_dlLPxfUiiGYyyulMiwPhDw-8qxs_UzG_ni2MFNgyXaHr8niLf2oP8LFBs-LQhzwVI6LnZU59KZp0n0CrdYJzdWtR-3778ZU7W93BcGgjB9-stKMDO49lWPHM16jj8UA3ouPT0';
// const token = localStorage.getItem('access_token');


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('access_token')}`,
	},
	paramsSerializer: params => queryString.stringify(params)
});

// Interceptor
// Add a request interceptorLis
axiosClient.interceptors.request.use(
	async (config) => {
		// Do something before request is sent
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
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