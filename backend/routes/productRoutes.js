const router = require('express').Router();
const productController = require('../controllers/productControllers')

router.post('/create', productController.createProduct)

// fetch all products
router.get('/get_all_products', productController.getAllProducts)

// single product
router.get('/get_single_product/:id', productController.getSingleProduct)

// delete product
router.delete('/delete_product/:id', productController.deleteProduct)

// update Product
router.put('/update_product/:id', productController.updateProduct)

module.exports = router