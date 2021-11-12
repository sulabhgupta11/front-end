import getConfig from 'next/config';
import Router from 'next/router';
import { filter } from 'rxjs';

import { fetchWrapper } from './../helpers/fetch-helper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/search/v1`;

export const searchService = {
    getByFilters,
    getAll
};


function getAll() {
    return fetchWrapper.get(`${baseUrl}/getAllProducts`);
}

function getByFilters(searchContext) {
    const filters = []
    searchContext.filters.forEach(filter => {
        filters.push({
            from: filter.key == 'price' ? filter.value[0] : "",
            to: filter.key == 'price' ? filter.value[1] : "",
            key: filter.key,
            type: filter.type,
            value: filter.key == 'price' ? "" : filter.value
        })
    })
    const body = {
        filters: filters,
        searchText: searchContext.searchText,
        size: 100
    }
    return fetchWrapper.post(`${baseUrl}/getProductsByFilter`, body);
}

function getAllFilters(filters) {
    return fetchWrapper.post(`${baseUrl}/search/getAllFilters`);
}