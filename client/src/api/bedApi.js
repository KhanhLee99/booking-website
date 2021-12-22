import axiosClient from "../utils/axiosClient";

const bedApi = {
    getListBedType: () => {
        const url = '/bed-type';
        return axiosClient.get(url);
    },
}

export default bedApi;