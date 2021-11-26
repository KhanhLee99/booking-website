import axiosClient from "../utils/axiosClient";

const testApi = {
    getList: () => {
        const url = '/reservation/user/1';
        return axiosClient.get(url);
    },

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

    addCity: (params) => {
        const url = '/city/add';
        return axiosClient.post(url, params);
    },

    getMe: () => {
        const url = '/me';
        return axiosClient.get(url);
    }
};

export default testApi;
