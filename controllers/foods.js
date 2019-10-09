const Customer = require('../models/customer');

module.exports = {
  createFood,
  deleteFood
};

async function createFood(req, res) {
  //console.log(req.user);
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    if(oneOrder.id === req.params.id) {
      console.log(oneOrder);
      oneOrder.food_items.push(req.body);
      customer.save();
      return res.json(orders[orders.length -1].food_items);
    }
  });
}

//not working yet
async function deleteFood(req, res) {
  console.log(req.params.id);
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    oneOrder.food_items.forEach(function(oneFood, idx) {
      if(oneFood.id === req.params.id) {
        console.log(oneFood);
        const deletedFood = oneOrder.food_items.splice(idx, 1);
        console.log(deletedFood);
        customer.save();
        return res.json(deletedFood);
      }
    });
  });
}
