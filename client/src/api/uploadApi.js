import axiosClient from "../utils/axiosClient";

const uploadApi = {

    uploadPhotosListing: (params) => {
        const url = '/photo-listing/upload/1';
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },

        })
            .catch(function (error) {
                console.log(error);
            });
    },
};

export default uploadApi;
