import React from 'react'

const AdminDashboard = () => {
  return (
   <>

    <div className='container mt-3'>

        <div className='d-flex justify-content-between'>
            <h3>Admin Dashboard</h3>
            <button className='btn btn-danger'>Add Product</button>
        </div>

        <table className='table'>
            <thead className='table-dark'>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Category</th>
                    <th>Descripton</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                  <td>
                    <img width={'40px'} height={'40px'} src="https://th.bing.com/th/id/OIP.Vtxy0FjT_EfudI4cQk1kzAHaE8?w=296&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                  </td>
                  <td>Flower</td>
                    <td>200</td>
                    <td>Indoor</td>
                    <td>Beautiful Flower</td>

                    <td>
                        <button className='btn btn-primary'>Edit</button>
                        <button className='btn btn-danger ms-2'>Delete</button>
                    </td>

                </tr>
            </tbody>

        </table>

    </div>
   
   </>
  )
}

export default AdminDashboard