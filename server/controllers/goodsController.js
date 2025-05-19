const uuid = require('uuid')
const path = require('path')
const {Goods, GoodsInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class GoodsController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, size} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const goods = await Goods.create({name, price, brandId, typeId, size,  img: fileName})

        if (info) {
            info = JSON.parse(info)
            info.forEach(i =>
                GoodsInfo.create({
                    title: i.title,
                    description: i.description,
                    goodsId: goods.id
                })
            )
        }

        return res.json(goods);

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let goods;
        if (!brandId && !typeId) {
            goods = await Goods.findAndCountAll({limit, offset})

        }
        if(brandId && !typeId) {
            goods = await Goods.findAndCountAll({where:{brandId}, limit, offset})

        }

        if(typeId && !brandId) {
            goods = await Goods.findAndCountAll({where:{typeId}, limit, offset})
            
        }

        if(brandId && typeId) {
            goods = await Goods.findAndCountAll({where:{brandId, typeId}, limit, offset})
            
        }
        return res.json(goods)
    }
    async getOne(req, res) {
        const {id} = req.params
        const goods = await Goods.findOne(
            {
                where:{id},
                include: [{model: GoodsInfo, as: 'info'}]
        },

        )
        return res.json(goods)
    }
}

module.exports = new GoodsController()