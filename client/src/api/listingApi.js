import axiosClient from "../utils/axiosClient";

const listingApi = {
    getListingsLocation: (params) => {
        const url = '/listing-detail';
        return axiosClient.get(url, { params });
    },

    getListingById: (id) => {
        const url = `listing/${id}`;
        return axiosClient.get(url);
    },

    favoriteListing: (params) => {
        const url = 'favorite/add';
        return axiosClient.post(url, params);
    },

    getBaseInfoListing: (id) => {
        const url = `listing/${id}/base-infomation`;
        return axiosClient.get(url);
    }
}

export default listingApi;