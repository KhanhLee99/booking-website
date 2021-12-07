import axiosClient from "../utils/axiosClient";

const listingApi = {
    getListingsLocation: (params) => {
        const url = '/listing-detail'
        return axiosClient.get(url, { params });
    }
}

export default listingApi;