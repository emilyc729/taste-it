import tokenService from '../utils/tokenService';

const BASE_URL = '/api/orders';


function getAllOrders() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

function createOrder(order) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(order)
    }).then(res => res.json());
}

function updateOrder(order_id, order) {
    return fetch(`${BASE_URL}/${order_id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(order)
    }).then(res => res.json());
}

function deleteOrder(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export default {
    getAllOrders,
    createOrder,
    updateOrder, 
    deleteOrder
};