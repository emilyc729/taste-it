const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const foodSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number
}, {
    timestamps: true
});

const orderSchema = new Schema({
    restaurant_name: String,
    restaurant_id: String,
    order_num: String,
    total_price: Number,
    total_items: Number,
    food_items: [foodSchema]
}, {
    timestamps: true
});

const customerSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String,
    phone: String,
    orders: [orderSchema]
}, {
    timestamps: true
});

customerSchema.set('toJSON', {
    transform: function (doc, ret) {
        // remove the password property when serializing doc to JSON
        delete ret.password;
        return ret;
    }
});

customerSchema.pre('save', function (next) {
    // this will be set to the current document
    const customer = this;
    if (!customer.isModified('password')) return next();
    // password has been changed - salt and hash it
    bcrypt.hash(customer.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        // replace the customer provided password with the hash
        customer.password = hash;
        next();
    });
});

customerSchema.methods.comparePassword = function (tryPassword, cb) {
    // 'this' represents the document that you called comparePassword on
    bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Customer', customerSchema);