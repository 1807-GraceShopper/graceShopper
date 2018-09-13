const router = require('express').Router();
const { OrderItem } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.json(orderItems);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const orderItem = await OrderItem.findById(id);
        res.json(orderItem);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newOrderItem = await OrderItem.create({
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.json(newOrderItem);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        orderItem.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})