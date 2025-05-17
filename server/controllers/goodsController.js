const uuid = require('uuid')
const path = require('path')
const {Goods} = require('../models/models')
const ApiError = require('../error/ApiError')
class GoodsController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))

        const goods = await Goods.create({name, price, brandId, typeId, size,  img: filename})

        return res.json(goods)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {


    }
    async getOne(req, res) {

    }
}

module.exports = new GoodsController()