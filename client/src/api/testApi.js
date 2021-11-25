import axiosClient from "../utils/axiosClient";

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWViMDZkOTQxODc0YzQ3NDEwNmVhNmMzNGZmYWM1MGZjZGZlNWIzMjllNjU0YmM4YjVhNTQwMjA4NWMyYTJhYmU0ZTRkYzRkMWY4ZDYwNjQiLCJpYXQiOjE2MzcwNTk1NDgsIm5iZiI6MTYzNzA1OTU0OCwiZXhwIjoxNjY4NTk1NTQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.o9_v7ioSHUwCUbvtVi38h9gSrTW2ArF1JfFtOv-qoPgdcIa1QvJhX3FgWSbM9bfFJgn3NNAeH-Tcz6bedKlL6Ino_FGkt90Kp6ScOSnvAnZmAWBoe0VAAmLyM8_A5Sr6MkbxiSDC63JPykFjOP8jGMI8WZA4q4P1Jk07CZYijhaW8B3QuK8-pMiIUsuMxrlzbmT3A6o2D_ZEs2PGnpH2icnpRaSkf2VO6uFlousIHaHZhJA26FVGKdBRytCGFgbkDX1x8IvJZWk0kGHUjp3OooI9jOZ0_3-V8gUgfBny8WJx4vVR7Z5RXzypKnUYGZNUZKicfh8xfI3kDAHLZLALJFSlZXD6HNDWJ52GgMNGflzSb1IitHeRs4mxyveyacmBiEo9GMejCpQrN2FJx2GANFqF9p9rYnnTaywWQjlXtURX3UUNP6AB7k4VZylbYIxHRMoK3_57Z47aWZqw812HhSel4cBJ50p2BdbHcsf-OZf0DWqPxUGKbwaZ7cyUpApEVjRhVqqLhG_27ta7j1c215n17hcOlSAe9Lkjoz3f0FA9ur_wPrC-bbs9GEXnKJ8tkS9wN73zJyW5C-PLmaOqoQ5PEht7TJY-XJLDHzWB9796qCBlMSYxwZ5b785-I5C6-NCJREPkbjRkUaekG_gdl-z9xBy_vLD_jibF3KDVYZ8';

const testApi = {
    getList: () => {
        const url = '/reservation/user/1';
        return axiosClient.get(url);
    },

    login: (params) => {
        const url = '/login';
        return axiosClient.post(url, params)
            .catch(function (error) {
                console.log(error);
            });
    },

    addCity: (params) => {
        const url = '/city/add';
        return axiosClient.post(url, params);
    }
};

export default testApi;
