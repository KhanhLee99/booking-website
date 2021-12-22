import axiosClient from "../utils/axiosClient";

const uploadApi = {

    uploadPhotosListing: (params, id) => {
        const url = `/photo-listing/upload/${id}`;
        return axiosClient.post(url, params, {
            headers: { 'Content-Type': 'multipart/form-data' },

        })
            .catch(function (error) {
                console.log(error);
            });
    },
};

export default uploadApi;
