const path = require('path')
const productModel = require('../models/productModel')
const fs = require('fs') // filesystem

const createProduct = async (req, res) => {

    // check incomming data
    console.log(req.body)
    console.log(req.files)

    // Destructuring the body data (json)
    const {
        productName,
        productPrice,
        productCategory,
        productDescription
    } = req.body;

    // Validation (Task)
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Enter all fields!"
        })
    }

    // validate if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Image not found!!"
        })
    }

    const { productImage } = req.files;

    // upload image
    // 1. Generate new image name (abc.png) -> (213456-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`

    // 2. Make a upload path (/path/uplad - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)


    // 3. Move to that directory (await, try-catch)
    try {
        await productImage.mv(imageUploadPath)

        // save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productCategory: productCategory,
            productDescription: productDescription,
            productImage: imageName
        })
        const product = await newProduct.save()
        res.status(201).json({
            "success": true,
            "message": "Product Created Successfully!",
            "data": product
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal Server Error!",
            "error": error
        })
    }

};

// Fetch all products
const getAllProducts = async (req, res) => {

    // try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product Fetched successfully!",
            "products": allProducts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

// fetch single product
const getSingleProduct = async (req, res) => {

    // get product id from url (params)
    const productId = req.params.id;

    // find
    try {
        const product = await productModel.findById(productId)
        if (!product) {
            res.status(400).json({
                "success": false,
                "message": "No Product Found!",
            })
        }

        res.status(201).json({
            "success": true,
            "message": "Product Fetched!",
            "product": product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }

}

// delete product
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            "success": true,
            "message": "Product Deleted successfully!",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

// update product
// 1. get product id (URL)
// 2. if image:
// 3. New image should be upload
// 4. Old image should be delete
// 5. Find product (database) productImage
// 6. find that image in directory
// 7. Delete
// 8. update that product

const updateProduct = async (req, res) => {
    try {

        // if there is image
        if (req.files && req.files.productImage) {

            // destructuring
            const { productImage } = req.files;

            // upload image to /public/products folder
            // 1. Generate new image name (abc.png) -> (213456-abc.png)
            const imageName = `${Date.now()}-${productImage.name}`

            // 2. Make a upload path (/path/uplad - directory)
            const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)

            // Move to folder
            await productImage.mv(imageUploadPath)

            // req.params (id), req.body(updated data - pn,pp,pc,pd), req.files (image)
            // add new field to req.body (productImage -> name)
            req.body.productImage = imageName; // image uploaded (generated name)

            // if image is uploaded and req.body is assingned
            if(req.body.productImage){

                // Finding existing product
                const existingProduct = await productModel.findById(req.params.id)
                
                // Searching in the directory/folder
                const oldImagePath = path.join(__dirname, `../public/products/${existingProduct.productImage}`)

                // delete from filesystem
                fs.unlinkSync(oldImagePath)
                
            }
        }

        // Update the data
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success : true,
            message : "Product updated!",
            product :  updatedProduct
        })




    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error
        })
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
};



// START YOUR PROJECT! (in Quite Mode)



