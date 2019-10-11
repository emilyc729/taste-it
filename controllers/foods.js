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
  orders.forEach(async function(oneOrder) {
    if(oneOrder.restaurant_id === req.params.id) {
      //returns food list
      const getFoodList = await oneOrder.food_items;
      return res.json(getFoodList);
    }
  });
}

async function createFood(req, res) {
  //console.log(req.user);
  const customer = await Customer.findById(req.user._id);
  const orders = customer.orders;
  orders.forEach(async function(oneOrder) {
    if(oneOrder.restaurant_id === req.params.id) {
      oneOrder.food_items.push(req.body);
      await customer.save();
      //returns updated food list
      console.log('-------');
      console.log(oneOrder.food_items);
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
        console.log(oneFood.id);
        oneFood.quantity = req.body.quantity;
        customer.save();
        //return updated food list
        console.log(oneOrder.food_items);
        return res.json(oneOrder.food_items);
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
        return res.json(oneOrder.food_items);
      }
    });
  });
}
