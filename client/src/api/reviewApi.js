import axiosClient from "../utils/axiosClient";

const reviewApi = {
    addReviewListing: (params, id) => {
        const url = `review-listing/${id}`;
        return axiosClient.post(url, params);
    },

    getReviewsByHostId: (params) => {
        const url = '/host/review-listing';
        return axiosClient.get(url, params);
    }
}

export default reviewApi;