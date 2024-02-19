import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";


interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    length: number;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}

const AllProducts = () => {

    const [data, setData] = useState<Product[]>([])
    const [cart, setCart] = useState<Product[]>([])
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    const [search, setSearch] = useState('')

    useEffect(() => {
        const Alldata = async () => {
            try {
                const data = await axios.get("https://dummyjson.com/products")
                console.log(data.data.products);
                setData(data.data.products)
            } catch (error) {
                console.log(error);
            }
        }
        Alldata()
    }, [])


    const addToCart = (product: Product) => {
        setCart((prevCourt) => [...prevCourt, product])
    }

    const filter = data.filter(product => {
        return (
            product.title.toLocaleLowerCase().includes(search) &&
            product.price >= minPrice &&
            product.price <= maxPrice
        )
    })
    return (
        <div>
            <div className='flex items-center justify-center space-x-3 '>
                <div className='flex rounded-xl items-center border p-2 w-fit'>
                    <p>Minimum : </p>
                    <input
                        type='number'
                        placeholder='Min price'
                        className='border-none focus:outline-none'
                        value={minPrice}
                        onChange={e => setMinPrice(parseInt(e.target.value))}
                    />
                </div>
                <div className='flex items-center rounded-xl border p-2 w-fit'>
                    <p>Maximum :</p>
                    <input
                        type='number'
                        placeholder='Max price'
                        className='border-none  focus:outline-none'
                        value={maxPrice}
                        onChange={e => setMaxPrice(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className=' flex items-center justify-center'>

                <div className='flex p-2 space-x-3 border rounded-xl w-fit items-center justify-center'>
                    <p>Search</p>
                    <input type="text" className='border-none focus:outline-none' placeholder='Enter Title...' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className=' w-fit flex items-center p-4'>
                    <CiShoppingCart className='h-8 w-8' />
                    <p className='text-xl'>
                        {
                            cart.length
                        }
                    </p>
                </div>
            </div>
            {/* <button onClick={Alldata}>Get Datat</button> */}
            <div className='w-full p-4  h-screen grid grid-cols-1 lg:grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 gap-4 content-start '>
                {filter.map((el) => (
                    <div className=' w-96 h-fit p-4 border rounded-xl space-y-3'>
                        <img src={el.thumbnail} alt="Loading..." className='h-48 w-80' />
                        <p>
                            {el.title}
                        </p>
                        <p>{el.description}</p>
                        <p>{el.price}</p>
                        <button onClick={() => addToCart(el)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllProducts
