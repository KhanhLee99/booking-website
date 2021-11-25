import axios from 'axios';

export default function callApi(endpoint, method = 'GET', body){
    return axios({
        method: method,
        url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};