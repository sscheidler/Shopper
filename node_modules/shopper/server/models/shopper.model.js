const mongoose = require('mongoose');

const shoppinglisttypeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'User' },
    shoppinglisttype: String,
    items: [{
        itemname: String,
        created: { type: Date, default: Date.now }
    }],
});


export default mongoose.model('ShoppingType', shoppinglisttypeSchema)


