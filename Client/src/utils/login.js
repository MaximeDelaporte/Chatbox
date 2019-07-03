import axios from 'axios';
const headers = {
    'Content-Type' : 'application/json'
};
const burl = 'http://localhost:8080'

export default {
    login : (email, password)=>{
        return axios.post(burl + '/user/login', {
            'email': email,
            'password' : password
        },{
            headers: headers
        })
    },
    signup : (send)=>{
        return axios.post(burl + '/user/signup', send, {headers: headers})
    },
    isAuth: ()=>{
        return (localStorage.getItem('token') !== null);
    },
    logout : ()=>{
        localStorage.clear();
    }
}
