import axiosClient from "../utils/axiosClient";

const amenityApi = {
    getAmenityType: () => {
        const url = '/amenity-type';
        return axiosClient.get(url);
    },

    getAmenity: () => {
        const url = '/amenity';
        return axiosClient.get(url);
    },
}

export default amenityApi;