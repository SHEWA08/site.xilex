const uuid = require('uuid')
const path = require('path')
const {Goods} = require('../models/models')
const ApiError = require('../error/ApiError')
class GoodsController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info, size} = req.body
        const img = req.files.img
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const goods = await Goods.create({name, price, brandId, typeId, size,  img: fileName, info})

        return res.json(goods)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        const {brandId, typeId} = req.query
        let goods;
        if (!brandId && !typeId) {
            goods = await Goods.findAll()

        }
        if(brandId && !typeId) {
            goods = await Goods.findAll({where:{brandId}})

        }

        if(typeId && !brandId) {
            goods = await Goods.findAll({where:{typeId}})
            
        }

        if(brandId && typeId) {
            goods = await Goods.findAll({where:{brandId, typeId}})
            
        }
        return res.json(goods)
    }
    async getOne(req, res) {

    }
}

module.exports = new GoodsController()