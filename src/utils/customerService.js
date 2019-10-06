import tokenService from './tokenService';

const BASE_URL = '/api/customers/';

function signup(customer) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(customer)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  .then(({token}) => {
    tokenService.setToken(token);
  });
}

function getCustomer() {
  return tokenService.getCustomerFromToken();
}

export default {
  signup,
  getCustomer,
};