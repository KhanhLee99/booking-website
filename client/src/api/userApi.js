import axiosClient from "../utils/axiosClient";

const userApi = {
    register: (params) => {
        const url = '/register';
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
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
    },

    deleteDeviceToken: () => {
        const url = '/delete-device-token';
        return axiosClient.put(url);
    },

    getMe: () => {
        const url = '/me';
        return axiosClient.get(url);
    },

    sendMailResetPassword: (params) => {
        const url = '/reset-password';
        return axiosClient.post(url, params);
    }
}

export default userApi;