import tokenService from '../utils/tokenService';

const BASE_URL = '/api/orders';


function getAllFoods(order_id) {
    return fetch(`${BASE_URL}/${order_id}/foods`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

function createFood(order_id, food) {
    return fetch(`${BASE_URL}/${order_id}/foods`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(food)
    }).then(res => res.json());
}

function deleteFood(food_id) {
    return fetch(`${BASE_URL}/foods/${food_id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json());
}

export default {
    getAllFoods,
    createFood, 
    deleteFood
};