import axios from "axios";

const LOCAL_PYTHON_API = 'http://localhost:5000';

const axiosRequestBuilder = (API_URL, URL, METHOD, BODY) => {
    switch (METHOD) {
        case 'GET':
            return axios.get(`${API_URL}/${URL}`);
        case 'POST':
            return axios.post(`${API_URL}/${URL}`, BODY);
        default:
            return;
    }
};


const genericRequest = {
    get: url =>
        axiosRequestBuilder(LOCAL_PYTHON_API, url, 'GET'),
    post: postUrl =>
        axiosRequestBuilder(LOCAL_PYTHON_API, postUrl, 'POST')
};

const PYTHON_API = {
    getUsers: () =>
        genericRequest.post(`getUsers`),
};

export default {
    PYTHON_API,
}