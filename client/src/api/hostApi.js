import axiosClient from "../utils/axiosClient";

const hostApi = {

    addListing: (params) => {
        const url = '/listing/add';
        return axiosClient.post(url, params)
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
    }
};

export default hostApi;
