import React, { useState } from 'react'

const UpdateProduct = () => {
    // get id from url
    // get product information (Backend)
    // fill all the info in each fields

    // make a use state
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    // state for image
    const [productNewImage, setProductNewImage] = useState(null)
    const [previewNewImage, setPreviewNewImage] = useState(null)
    const [oldImage, setOldImage] = useState('')

    // image upload handler
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductNewImage(file) // for backend
        setPreviewNewImage(URL.createObjectURL(file))
    }









    return (
        <>
            <div className='container mt-3'>

                <h2>Update product for <span className='text-danger'>'Flower'</span></h2>

                <div className='d-flex gap-3'>
                    <form action="">
                        <label htmlFor="">Product Name</label>
                        <input onChange={(e) => setProductName(e.target.value)} className='form-control' type="text" placeholder='Enter your product name' />

                        <label className='mt-2' htmlFor="">Product Price</label>
                        <input onChange={(e) => setProductPrice(e.target.value)} className='form-control' type="number" placeholder='Enter your product name' />

                        <label className='mt-2'>Choose category</label>
                        <select onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                            <option value="plants">Plants</option>
                            <option value="electronics">Electronics</option>
                            <option value="gadgets">Gadgets</option>
                            <option value="furniture">Furniture</option>
                        </select>

                        <label className='mt-2'>Enter description</label>
                        <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                        <label className='mt-2'>Choose product Image</label>
                        <input onChange={handleImage} type="file" className='form-control' />

                        <button className='btn btn-danger w-100 mt-2'>Update Product</button>


                    </form>
                    <div className='image section'>
                        <h6>Previewing old image</h6>
                        <img height={'150px'} width={'300px'} className='image-fluid rounded-4 object-fit-cover' src="https://th.bing.com/th/id/OIP.tSiPSV9ZU_J-Nbz6-ktORQHaE8?w=240&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />


                        {
                            previewNewImage && <>
                                <h6 className='mt-3'>New image</h6>
                                <img height={'150px'} width={'300px'} className='image-fluid rounded-4 object-fit-cover' src={previewNewImage} alt="" />
                            </>
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateProduct




