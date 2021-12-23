import axios from "axios";
import queryString from 'query-string';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODcyMDI5YzJiMjVkYzhlYjRmZDRjMDNkOTYzNTcwOWNjN2JkZjVjOGE2ODc5ZjZkYjY0YThhODhjYmJlNWI0YTcwYjM2YTU1YWQxZmI2OGQiLCJpYXQiOjE2NDAyNzY2MzAsIm5iZiI6MTY0MDI3NjYzMCwiZXhwIjoxNjcxODEyNjMwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.K5FB1bj0nbPSS6CNtw-MEnivW_ffRfc1JVIRIYVgIXEU-UzLyBZTRg-kxJwE_rTjiwB3t8Xs5eocS4_6FFVH_jDb9bPD_HhKggg6IujM3GORpBRO764IGsgciXTeSAsktbaTE4mp1niuL_fzWjOgDay7hL-TnBr8WbiZBu51ctA8JVvTZtLXP_DSBUjfi29TRhcMPtZ1lFLiUxaxG_3bDnAvrxVKzdnKG0CCAm5F1Y0c7npWXrqaDhm2CmnRXdJiuOZB6jB6R9VbdjP9BTMieBM54NdDUd1RP3jcxmQ1jSFGfYaFgd7VY8TTNXujL_UCQXd2FafXsWGGB-ti4XU53Y6jAddOBc_DsO8z7_W0QL_1fnHFJkA2OUDy2dTHlCsfY32phesk6F88jUvuDUir5KwdALD0dK5vXXtZ6AsIJxR1F4RKiboLuqERtxuAQR6R1C0b56U1hijRvTFkUFdZ52AMiR8vAnTIk1dgLvKAPefUDUVmCL-wSyJJupSZTrmLWiCyG82W2VIC_jSbfwZJ7i60rR8L0AUVv2DPoA_mcm2BP6xcFz3wMImQqNxqkRlS6TExa-js_IYRpj-lqWMRZFgvEdz2sPDzX9pZxDFneoT_qld3n-74up0E6AfQPWxVqKJ2BKh0A2793Izv6A3lUB4rwokdOfMvz6Xc_DXODgA';
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