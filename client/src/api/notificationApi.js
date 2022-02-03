import axiosClient from "../utils/axiosClient";

const notificationApi = {
    sendNotification: (params) => {
        const url = '/send-notifications';
        return axiosClient.post(url, params);
    },

    getMyNotications: () => {
        const url = '/notification/me';
        return axiosClient.get(url);
    },

    getTotalNoticationsUnread: () => {
        const url = '/notification/unread-total';
        return axiosClient.get(url);
    },

    seenNotifications: () => {
        const url = '/notification/seen';
        return axiosClient.put(url);
    },
}

export default notificationApi;