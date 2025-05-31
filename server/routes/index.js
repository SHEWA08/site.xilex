const Router = require('express');
const router = new Router();

const goodsRouter = require('./GoodsRouter');
const userRouter = require('./UserRouter');
const brandRouter = require('./BrandRouter');
const typeRouter = require('./TypeRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/goods', goodsRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter); 

module.exports = router;
