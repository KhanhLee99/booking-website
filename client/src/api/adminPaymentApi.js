import axiosClient from "../utils/axiosClient";

const adminPaymentApi = {
    add: (params) => {
        const url = '/admin/payment/add';
        return axiosClient.post(url, params);
    },

    index: (params) => {
        const url = '/admin/payment';
        return axiosClient.get(url, params);
    }
}

export default adminPaymentApi;