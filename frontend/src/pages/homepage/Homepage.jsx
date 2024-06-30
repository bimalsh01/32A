import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { testApi, getAllProducts } from "../../apis/Api";
import ProductCard from "../../components/ProductCard";

const Homepage = () => {

    const [products, setProducts] = useState([]) // array

    // 2. Call API initially (Page Load) - Set all fetch products to state (1)
    useEffect(() => {

        getAllProducts().then((res) => {
            // response : res.data.products (All Products)
            setProducts(res.data.products)

        }).catch((error) => {
            console.log(error)
        })

    }, [])

    return (
        <>

            <div className="container">

                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>80% OFF Shoes on Adidas</h5>
                                <p>Imported from Japan with Custom Size</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>New Macbook On Market</h5>
                                <p>Apple Macbook Pro 2025 Launched!</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Tshirt on Sale</h5>
                                <p>Cotton Fiber Tshirt and Glass</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


                <h2 className="mt-2">Available Products</h2>

                <div class="row row-cols-1 row-cols-md-4 g-4">


                    {
                        products.map((singleProduct) => (
                            <div class="col" 
                            key={singleProduct._id}
                            >
                                <ProductCard productInformation={singleProduct} color={'green'} />
                            </div>
                        ))
                    }


                </div>


            </div>

        </>
    )
}

export default Homepage;