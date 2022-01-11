import axiosClient from "../utils/axiosClient";

const reviewApi = {
    addReviewListing: (params, id) => {
        const url = `review-listing/${id}`;
        return axiosClient.post(url, params);
    }
}

export default reviewApi;