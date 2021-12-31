import axiosClient from "../utils/axiosClient";

const adminListing = {
    getListingPending: () => {
        const url = '/admin/listing/pending';
        return axiosClient.get(url);
    },

    getListingActive: () => {
        const url = '/admin/listing/active';
        return axiosClient.get(url);
    },

    activeListing: (id) => {
        const url = `/admin/listing/${id}/active`;
        return axiosClient.put(url);
    },

    lockListing: (id) => {
        const url = `/admin/listing/${id}/lock`;
        return axiosClient.put(url);
    }
}

export default adminListing;