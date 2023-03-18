const mongoose = require('mongoose')

const automobileSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    owner: {
        ownerId: mongoose.Schema.Types.ObjectId,
        fullName: String
    },
    color: String,
    interiorColor: String,
    vin: Number,
    type: String,
    price: Number,
    pictures: {
        primary: String,
        interior: String
    }
}, {
    timestamps: true
})

const automobileModel = mongoose.model('automobile', automobileSchema)

module.exports = automobileModel