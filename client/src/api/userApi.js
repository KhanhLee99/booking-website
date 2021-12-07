import axiosClient from "../utils/axiosClient";

const userApi = {
    login: (params) => {
        const url = '/login';
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    loginGoogle: (params) => {
        const url = '/login_google';
        return axiosClient.post(url, params);
    },

    loginFacebook: (params) => {
        const url = '/login_facebook';
        return axiosClient.post(url, params);
    },
}

export default userApi;