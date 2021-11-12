import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from './../helpers/fetch-helper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/order`;

export const orderService = {
    placeOrder,
    cancelOrder,
    findById,
    findAllByUserId
};


function findById(id) {
    return fetchWrapper.get(`${baseUrl}/order/${id}`);
}

function findAllByUserId(userId) {
    return fetchWrapper.get(`${baseUrl}/order/${userId}`);
}

function placeOrder(order) {
    return fetchWrapper.post(`${baseUrl}/order/placeOrder`);
}

function cancelOrder(id) {
    return fetchWrapper.post(`${baseUrl}/products/${id}`);
}

function deleteProduct(id) {
    return fetchWrapper.delete(`${baseUrl}/products/${id}`);
}