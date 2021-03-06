import axiosClient from "../utils/axiosClient";

const reservationApi = {
    sendReservation: (params) => {
        const url = '/reservation/add';
        return axiosClient.post(url, params);
    },

    getReservationInMonth: (id, params) => {
        const url = `/reservation/listing/${id}/month`;
        return axiosClient.get(url, { params });
    },

    getMyReservation: () => {
        const url = '/reservation/me';
        return axiosClient.get(url);
    },

    getDetailReservation: (id) => {
        const url = `/reservation/${id}`;
        return axiosClient.get(url);
    },

    editStatusReservation: (id, params) => {
        const url = `/reservation/edit-status/${id}`;
        return axiosClient.put(url, params);
    },

    countTotalPrice: (params) => {
        const url = '/reservation/count-total-price';
        return axiosClient.post(url, params);
    },

    getTimeline: (id) => {
        const url = `/timeline/${id}`;
        return axiosClient.get(url);
    },

    checkReservation: (params) => {
        const url = '/reservation-check';
        return axiosClient.post(url, params);
    },

    checkPayment: (id) => {
        const url = `/reservation-check-payment/${id}`;
        return axiosClient.post(url);
    },
}

export default reservationApi;