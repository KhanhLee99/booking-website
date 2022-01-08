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

    hostLogin: (params) => {
        const url = '/host/login';
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    updateDeviceToken: (params, token) => {
        const url = '/update-device-token';
        return axiosClient.put(url, params, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default userApi;