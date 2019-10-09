const Customer = require('../models/customer');

module.exports = {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood
};



async function getAllFoods(req, res) {
  //console.log(req.user);
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    if(oneOrder.id === req.params.id) {
      //returns food list
      return res.json(oneOrder.food_items);
    }
  });
}

async function createFood(req, res) {
  //console.log(req.user);
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    if(oneOrder.id === req.params.id) {
      console.log(oneOrder);
      oneOrder.food_items.push(req.body);
      customer.save();
      //returns updated food list
      return res.json(oneOrder.food_items);
    }
  });
}

async function updateFood(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    oneOrder.food_items.forEach(function(oneFood, idx) {
      if(oneFood.id === req.params.id) {
        oneFood.quantity = req.body.quantity;
        customer.save();
        return res.json(oneFood);
      }
    });
  });
}

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
