import axios from "axios";

// creating backend Config!
const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers : {
        "Content-Type" : "multipart/form-data",
    }
})

// make a config for token
const config = {
    headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}


// Test API
export const testApi = () => Api.get('/test')

// Register Api
export const registerUserApi = (data) => Api.post('/api/user/create', data)

// login api
export const loginUserApi = (data) => Api.post('/api/user/login', data)

// create prodcuct API
export const createProductApi = (data) => Api.post('/api/product/create', data)

// get all products api
export const getAllProducts = () => Api.get('/api/product/get_all_products', config)

// get single product (Task)
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)

// delete
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`, config)

// update product
export const updateProduct = (id, data) => Api.put(`/api/product/update_product/${id}`, data, config)

// http://localhost:5000/test

// products : [{product1:name,price}, {product2:name,price}]

// tr : products (All)
//      product (Single Info)
//      product.name (Single info -> name)