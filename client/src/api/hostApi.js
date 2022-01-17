import axiosClient from "../utils/axiosClient";

const hostApi = {

    addListing: (params) => {
        const url = '/listing/add';
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    updateListing: (params, id) => {
        const url = `/listing/${id}`;
        return axiosClient.put(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    getListingType: () => {
        const url = '/listing-type';
        return axiosClient.get(url)
            .catch(function (err) {
                console.log(err.message);
            })
    },

    getNewestListing: () => {
        const url = '/listing/newest';
        return axiosClient.get(url)
            .catch(function (err) {
                console.log(err.message);
            })
    },

    editBedRoom: (params, id) => {
        const url = `/listing/edit-bedroom/${id}`;
        return axiosClient.put(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    addListingAmenities: (params, id) => {
        const url = `/listing/amenities/${id}`;
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    getListingAmenitiesId: (id) => {
        const url = `/listing/${id}/amenities`;
        return axiosClient.get(url)
            .catch(function (error) {
                console.log(error);
            });
    },

    getListingsByUserId: (params) => {
        const url = '/listing/user';
        return axiosClient.get(url, params)
            .catch(function (error) {
                console.log(error);
            });
    }
};

export default hostApi;
