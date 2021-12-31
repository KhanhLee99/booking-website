import axiosClient from "../utils/axiosClient";

const adminAuthApi = {
    login: (params) => {
        const url = '/admin/login';
        return axiosClient.post(url, params);
    },
}

export default adminAuthApi;