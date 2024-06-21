const router = require('express').Router();
const productController = require('../controllers/productControllers');
const { authGuard, adminGuard } = require('../middleware/authGuard');

router.post('/create', productController.createProduct)

// fetch all products
router.get('/get_all_products', productController.getAllProducts)

// single product
router.get('/get_single_product/:id',authGuard, productController.getSingleProduct)

// delete product
router.delete('/delete_product/:id',adminGuard, productController.deleteProduct)

// update Product
router.put('/update_product/:id',adminGuard, productController.updateProduct)

module.exports = router

