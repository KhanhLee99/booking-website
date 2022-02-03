import axiosClient from "../utils/axiosClient";

const conversationApi = {
    fetchConversation: (id) => {
        const url = `/messages/${id}`;
        return axiosClient.get(url);
    },

    fetchListConversation: () => {
        const url = '/conversations';
        return axiosClient.get(url);
    },

    sendMessage: (params) => {
        const url = '/send-message';
        return axiosClient.post(url, params);
    },

    getConversationTogether: (params) => {
        const url = '/messages/with/host';
        return axiosClient.get(url, params);
    }
}

export default conversationApi;