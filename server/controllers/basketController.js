const { Basket, BasketGoods, Goods } = require('../models/models');


class BasketController {
    async addToBasket(req, res) {
        const { goodsId } = req.body;
        const userId = req.user.id;

        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }


        const existingBasketGoods = await BasketGoods.findOne({ where: { basketId: basket.id, goodsId } });

        if (existingBasketGoods) {
            return res.status(400).json({ message: "Этот товар уже добавлен в корзину!" });
        }

        const basketGoods = await BasketGoods.create({
            basketId: basket.id,
            goodsId,
        });

        return res.json(basketGoods);
    }


    async getBasket(req, res) {
        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: { userId },
            include: {
                model: BasketGoods,
                include: [{model: Goods, as: 'goods' }],
            },
        });

        return res.json(basket);
    }

    async removeFromBasket(req, res) {
        const { basketGoodsId } = req.params;
        await BasketGoods.destroy({ where: { id: basketGoodsId } });
        return res.json({ message: 'Удалено из корзины' });
    }
}

module.exports = new BasketController();