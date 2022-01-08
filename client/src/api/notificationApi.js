import axiosClient from "../utils/axiosClient";

const notificationApi = {
    sendNotification: (params) => {
        const url = '/send-notifications';
        return axiosClient.post(url, params);
    },
}

export default notificationApi;