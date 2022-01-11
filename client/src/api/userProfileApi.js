import axiosClient from "../utils/axiosClient";

const userProfileApi = {
    changePassword: (params) => {
        const url = '/new-password';
        return axiosClient.put(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    editProfile: (params) => {
        const url = '/user/edit-profile';
        return axiosClient.put(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    getFavorites: () => {
        const url = '/favorite';
        return axiosClient.get(url)
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default userProfileApi;