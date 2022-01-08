import axiosClient from "../utils/axiosClient";

const blockBookingApi = {
    blockBooking: (params) => {
        const url = '/block-booking/add';
        return axiosClient.post(url, params);
    },

    getBlockInMonth: (id, params) => {
        const url = `/block-booking/${id}/month`;
        return axiosClient.get(url, { params });
    }
}

export default blockBookingApi;