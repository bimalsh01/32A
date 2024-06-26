// import request from supertest
const request = require('supertest')

// Importing server file
const app = require('../index')

// testing token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkyOTYyOGI0OTc4MmRmYzUzNzY2YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTIwMzQwNn0.myB9JAl_jamoVuDsfGj6pQ06xX-p7b4KK771zXHqZ_o'


// describe (List of test cases)
describe('Testing API', () => {

    // testing '/test' api
    it('GET /test | Response with text', async () => {
        // request sending
        const response = await request(app).get('/test')

        // if its successful, status code
        expect(response.statusCode).toBe(200)

        // Compare received text
        expect(response.text).toEqual('Test API is Working!...')

    })

    // Registration testing
    // 1. sending request (With data)
    // 2. expect : 201
    // 3. if already exist : handle accordingly
    // 4. success

    it('POST /api/user/create | Response with body', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName" : "John",
            "lastName" : "Shah",
            "email" : "John@gmail.com",
            "password" : "John@@1"
        })

        // if condition
        if(!response.body.success){
            expect(response.body.message).toEqual('User Already Exists!')
        } else{
            expect(response.body.message).toEqual('User Created Successfully!')
        }
    })

    // Login 
    // login with  "email" : "John@gmail.com",
            // "password" : "John@@1"

    // expect : token (Length)
    // expect : userData
    // expect : userData.firstName == John
    // expect : message
    // expect : Incorrect password

    // get all products, set token in header
    it('GET /api/product/get_all_products | Response with body', async () => {

        const response = await request(app).get('/api/product/get_all_products').set('authorization', `Bearer ${token}`)

        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('Product Fetched ')

    })

  
})
