const Customer = require('../models/customer');


module.exports = {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood
};



async function getAllFoods(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(async function(oneOrder) {
    if(oneOrder.restaurant_id === req.params.id) {
      //returns food list
      const getFoodList = await oneOrder.food_items;
      return res.json(getFoodList);
    }
  });
}

async function createFood(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(async function(oneOrder) {
    if(oneOrder.restaurant_id === req.params.id) {
      oneOrder.food_items.push(req.body);
      await customer.save();
      //returns updated food list
      return res.json(oneOrder.food_items);
    }
  });
}

async function updateFood(req, res) {
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(function(oneOrder) {
    oneOrder.food_items.forEach(function(oneFood) {
      if(oneFood.id === req.params.id) {
        oneFood.quantity = req.body.quantity;
        customer.save();
        //return updated food list
        return res.json(oneOrder.food_items);
      }
    });
  });
}

async function deleteFood(req, res) {
  const customer = await Customer.findById(req.user._id);
  const foodList = customer.orders[req.body.orderIdx].food_items;
  foodList.forEach(async function(food, idx) {
    if(req.params.id === food.id) {
      const deletedFood = foodList.splice(idx, 1);
      customer.save();
      //return deleted food
      return res.json(deletedFood);
    }
  });
}
