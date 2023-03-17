const Automobile = require('../models/automible.model');

async function getAllAutomobiles(req, res, next) {
    try {
        const automobiles = await Automobile.find({})
        res.json({data: automobiles})
    } catch (e) {
        next(e)
    }
}

async function addAutomobile(req, res, next) {
    try {
        const payload = req.body
        const result = await Automobile.create(payload)
        res.json({data: result})
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAllAutomobiles,
    addAutomobile
}