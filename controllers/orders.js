const Customer = require('../models/customer');

module.exports = {
  index,
  create,
  delete: deleteOne
};

async function index(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  return res.status(200).json(orders);
}

async function create(req, res) {
  //console.log(req.user);
  const customer = await Customer.findById(req.user._id);
  customer.orders.push(req.body);
  const saveCustomer = await customer.save();
  return res.json(saveCustomer.orders);
}

async function deleteOne(req, res) {
  const customer = await Customer.findById(req.user._id);
  customer.orders.forEach(function(order, idx) {
    if(req.params.id === order.id) {
      const deletedOrder = customer.orders.splice(idx, 1);
      customer.save();
      return res.json(deletedOrder);
    }
  })
}
