import axiosClient from "../utils/axiosClient";

const reservationApi = {
    sendReservation: (params) => {
        const url = '/reservation/add';
        return axiosClient.post(url, params);
    },

    getReservationInMonth: (id, params) => {
        const url = `/reservation/listing/${id}/month`;
        return axiosClient.get(url, { params });
    }
}

export default reservationApi;