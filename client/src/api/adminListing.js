import axiosClient from "../utils/axiosClient";

const adminListing = {
    getListingPending: (params) => {
        const url = '/admin/listing/pending';
        return axiosClient.get(url, params);
    },

    getListingActive: (params) => {
        const url = '/admin/listing/active';
        return axiosClient.get(url, params);
    },

    activeListing: (id) => {
        const url = `/admin/listing/${id}/active`;
        return axiosClient.put(url);
    },

    lockListing: (id) => {
        const url = `/admin/listing/${id}/lock`;
        return axiosClient.put(url);
    },

    getHostBooking: (host_id, params) => {
        const url = `/reservation/host/${host_id}`;
        return axiosClient.get(url, params);
    },

    getCountListingFilter: () => {
        const url = '/admin/listing/count';
        return axiosClient.get(url);
    }
}

export default adminListing;