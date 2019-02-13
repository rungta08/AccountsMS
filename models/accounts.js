const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountNo: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['current','savings','loan'],
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    balance: {
        type: Currency,
        default: "0"
    },
    pancard: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

var Accounts = mongoose.model('Account', accountSchema);

module.exports = Accounts;