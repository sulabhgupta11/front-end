import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from './../helpers/fetch-helper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/order/v1`;

export const orderService = {
    placeOrder,
    cancelOrder,
    findById,
    findAllByUserId
};

function findById(id) {
    return fetchWrapper.get(`${baseUrl}/user/view-order?orderId=${id}`);
}

function findAllByUserId(userId) {
    return fetchWrapper.get(`${baseUrl}/user/list-orders?userId=${userId}`);
}

function placeOrder(order) {
    return fetchWrapper.post(`${baseUrl}/user/create-order`, order);
}

function cancelOrder(order) {
    return fetchWrapper.post(`${baseUrl}/user/cancel-order`, order);
}