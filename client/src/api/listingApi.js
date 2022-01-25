import axiosClient from "../utils/axiosClient";

const listingApi = {
    getListingsLocation: (params) => {
        const url = '/listing-location';
        return axiosClient.get(url, { params });
    },

    getListingById: (id) => {
        const url = `listing/${id}`;
        return axiosClient.get(url);
    },

    // getListingByCityId: (id) => {
    //     const url = `listing/city/${id}`;
    //     return axiosClient.get(url);
    // },

    favoriteListing: (params) => {
        const url = 'favorite/add';
        return axiosClient.post(url, params);
    },

    getBaseInfoListing: (id) => {
        const url = `listing/${id}/base-infomation`;
        return axiosClient.get(url);
    },

    filterByListingType: (params) => {
        const url = 'listing-type/filter';
        return axiosClient.post(url, params);
    },

    filterByRating: (params) => {
        const url = 'listing-rating/filter';
        return axiosClient.post(url, params);
    },

    filterListing: (params) => {
        const url = 'listing/filter';
        return axiosClient.post(url, params);
    },

    getNameCity: (id) => {
        const url = `city/${id}/name`;
        return axiosClient.get(url);
    }
}

export default listingApi;