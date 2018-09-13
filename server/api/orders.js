const router = require('express').Router();
const { Order, OrderItem } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [{model: OrderItem}]
        });
        res.json(orders);
    } catch (err) {
        next(err);
    }
});

router.get('/:orderId', async (req, res, next) => {
    const id = req.params.orderId;
    try {
        const order = await Order.findById(id, { 
            include: [{model: OrderItem }]
        });
        res.json(order);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newOrder = await Order.create({
            name: req.order,
        })
    } catch (err) {
        next(err);
    }
})