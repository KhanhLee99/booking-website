import axiosClient from "../utils/axiosClient";

const adminDashboardApi = {
    getOverviewInfo: () => {
        const url = '/admin/dashboard/overview';
        return axiosClient.get(url);
    },

    getChartData: () => {
        const url = '/admin/dashboard/chart';
        return axiosClient.get(url);
    }
}

export default adminDashboardApi;