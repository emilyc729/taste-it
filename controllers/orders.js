const Customer = require('../models/customer');

module.exports = {
  index,
  create,
  update,
  delete: deleteOne
};

async function index(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  return res.status(200).json(orders);
}

async function create(req, res) {
  const customer = await Customer.findById(req.user._id);
  customer.orders.push(req.body);
  const saveCustomer = await customer.save();
  return res.json(saveCustomer.orders);
}

async function update(req, res) {
  const customer = await Customer.findById(req.user._id);
  customer.orders.forEach(async function(order) {
    if(req.params.id === order.id) {
      order.total_price = req.body.total_price;
      order.total_items = req.body.total_items;
      await customer.save();
      //return one order
      res.json(order);
    }
  });
}

async function deleteOne(req, res) {
  const customer = await Customer.findById(req.user._id);
  customer.orders.forEach(async function(order, idx) {
    if(req.params.id === order.id) {
      customer.orders.splice(idx, 1);
      const saveCustomer = await customer.save();
      return res.json(saveCustomer.orders);
    }
  });
}
