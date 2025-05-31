const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingController.addOrUpdateRating);

router.get('/:goodsId', ratingController.getAverageRating);

module.exports = router;
