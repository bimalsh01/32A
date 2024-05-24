const router = require('express').Router();
const productController = require('../controllers/productControllers')

router.post('/create', productController.createProduct)

module.exports = router