import axiosClient from "../utils/axiosClient";

const adminBooking = {
    index: (params) => {
        const url = '/admin/bookings';
        return axiosClient.get(url, params);
    }
}

export default adminBooking;