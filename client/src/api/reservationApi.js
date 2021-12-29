import axiosClient from "../utils/axiosClient";

const reservationApi = {
    sendReservation: (params) => {
        const url = '/reservation/add';
        return axiosClient.post(url, params);
    },
}

export default reservationApi;