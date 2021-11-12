import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from './../helpers/fetch-helper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/product/v1`;

export const productService = {
    getById,
    getAll,
    addProduct,
    updateProduct,
    deleteProduct,
};

function getAll() {
    return fetchWrapper.get(`${baseUrl}/service/getProducts`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/service/getProductById?productId=${id}`);
}

function addProduct(product) {
    return fetchWrapper.post(`${baseUrl}/admin/addProduct`, product);
}

function updateProduct(product) {
    return fetchWrapper.post(`${baseUrl}/admin/updateProduct`, product);
}

function deleteProduct(product) {
    return fetchWrapper.post(`${baseUrl}/admin/removeProduct`, product);
}