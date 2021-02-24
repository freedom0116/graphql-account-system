const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    lastActive: {
        type: String,
        required: true
    },
    createDate: {
        type: String,
        required: true
    },
})

const Account = mongoose.model('account', AccountSchema)

module.exports = Account