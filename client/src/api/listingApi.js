import axiosClient from "../utils/axiosClient";

const listingApi = {
    getListingsLocation: () => {
        const url = '/listing-detail'
        return axiosClient.get(url);
    }
}

export default listingApi;