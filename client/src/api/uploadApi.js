import axiosClient from "../utils/axiosClient";

const uploadApi = {
    // upload multi photo once
    uploadPhotosListing: (params, id) => {
        const url = `/photo-listing/upload/${id}`;
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .catch(function (error) {
                console.log(error);
            });
    },

    // update user ava
    uploadAvatarUser: (params) => {
        const url = '/update-avatar';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .catch(function (error) {
                console.log(error);
            });
    },


    // postImageListing: (params, id) => {
    //     const url = `/photo-listing/post-image-listing/${id}`;
    //     return axiosClient.post(url, params, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },

    // add 1 photo to Photo_Listing_TB
    uploadPhoto: (params, id) => {
        const url = `/photo-listing/upload-photo/${id}`;
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .catch(function (error) {
                console.log(error);
            });
    },

    // upload Ava Listing
    uploadThumbnail: (params, id) => {
        const url = `/photo-listing/upload-thumbnail/${id}`;
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .catch(function (error) {
                console.log(error);
            });
    },
};

export default uploadApi;
