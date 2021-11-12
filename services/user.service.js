import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from './../helpers/fetch-helper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth/v1`;
// const baseUrl = `localhost:3000`
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
    register,
    getById,
    delete: _delete
};

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/userAuthService/userSignIn`, { email, password }, true)
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/user/login');
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/userAuthService/userSignUp`, user, true);
}


function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}