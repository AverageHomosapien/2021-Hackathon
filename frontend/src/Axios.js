import { convertRowsPropToState } from "@material-ui/data-grid";
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
        genericRequest.get(`users`),
    getInterests: () =>
        genericRequest.get(`interests`),
    getInterestsID: (id) =>
        genericRequest.get(`interests?id=${id}`)
};

export default {
    PYTHON_API
}