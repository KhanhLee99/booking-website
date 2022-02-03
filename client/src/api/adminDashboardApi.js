import axiosClient from "../utils/axiosClient";

const adminDashboardApi = {
    getOverviewInfo: () => {
        const url = '/admin/dashboard/overview';
        return axiosClient.get(url);
    },
}

export default adminDashboardApi;