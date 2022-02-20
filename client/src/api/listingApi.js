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
    },

    getListingPreview: (id) => {
        const url = `/listing/${id}/preview`;
        return axiosClient.get(url);
    },

    updateImages: (params, id) => {
        const url = `/photo-listing/update-images-listing/${id}`;
        return axiosClient.put(url, params);
    },

    addPhotoListing: (params) => {
        const url = '/photo-listing/add';
        return axiosClient.post(url, params);
    },

    deleteAllPhotoListing: (id) => {
        const url = `/photo-listing/all/${id}`;
        return axiosClient.delete(url);
    },

    deletePhotoListing: (id) => {
        const url = `/photo-listing/${id}`;
        return axiosClient.delete(url);
    },

    updateListingAvatar: (params, id) => {
        const url = `/photo-listing/update-avatar-listing/${id}`;
        return axiosClient.put(url, params);
    },

    getCity: () => {
        const url = '/city';
        return axiosClient.get(url);
    }
}

export default listingApi;
// Route::put('photo-listing/update-avatar-listing/{id}', 'Host\PhotoListingController@update_photo_url_thumbnail');
