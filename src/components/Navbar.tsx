import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-evenly list-none p-3'>
            <div>
                <li>Anurag</li>
            </div>
            <div className='flex space-x-6'>
                <li>Home</li>
                <li>About</li>
                <li>Profile</li>
                <li>Product</li>
            </div>
        </div>
    )
}

export default Navbar
