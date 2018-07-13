import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

axios.defaults.baseURL='url'
axios.defaults.headers.common['Authorisation'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.interceptors.request.use(req => {
//     console.log(req);
    
// }, err => {
//     console.log(err)
// })
// axios.interceptors.response.use(resp => {
//     console.log(resp);
    
// }, err => {
//     console.log(err)
// })



export const get = (url, params, resolve, reject) => {
    instance.get(url, params)
        .then(response => resolve(response))
        .catch(error => reject(error));
}

export const post = (url, data, resolve, reject) => {
    instance.post(url, data)
        .then(response => resolve(response))
        .catch(error => reject(error));
}