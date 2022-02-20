import axiosClient from "../utils/axiosClient";

const adminUser = {
    get_all_user: (params) => {
        const url = '/admin/user/all';
        return axiosClient.get(url, params);
    },
    get_all_host: (params) => {
        const url = '/admin/host/all';
        return axiosClient.get(url, params);
    },
}

export default adminUser;