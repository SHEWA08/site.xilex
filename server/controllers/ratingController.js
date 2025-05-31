const { Rating, Goods } = require('../models/models');

class RatingController {
    async addOrUpdateRating(req, res) {
    const { goodsId, rate } = req.body;
    const userId = req.user.id;

    try {
        let rating = await Rating.findOne({ where: { userId, goodsId } });

        if (rating) {
            return res.status(400).json({ message: 'Вы уже оценили этот товар!' });
        }

        const newRating = await Rating.create({ userId, goodsId, rate });
        return res.json({ message: 'Рейтинг добавлен', rating: newRating });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Ошибка при добавлении рейтинга' });
    }
}

    async getAverageRating(req, res) {
        const { goodsId } = req.params;

        try {
            const ratings = await Rating.findAll({ where: { goodsId } });

            if (ratings.length === 0) {
                return res.json({ average: 0, count: 0 });
            }

            const total = ratings.reduce((acc, r) => acc + r.rate, 0);
            const average = total / ratings.length;

            return res.json({ average: parseFloat(average.toFixed(1)), count: ratings.length });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении рейтинга' });
        }
    }
}

module.exports = new RatingController();
