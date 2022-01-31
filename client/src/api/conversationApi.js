import axiosClient from "../utils/axiosClient";

const conversationApi = {
    fetchConversation: (id) => {
        const url = `/messages/${id}`;
        return axiosClient.get(url);
    },
}

export default conversationApi;