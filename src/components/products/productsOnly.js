import { useEffect, useState } from "react"
import "./products.css"
import { Product } from "./product.js"

export const ProductsOnly = ({ searchTermState }) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [clickedProduct, setClickedProduct] = useState({})

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        }, [searchTermState]
    )

    useEffect(
        () => {fetch('http://localhost:8088/products?_expand=productType&?_sort=name&_order=asc')
            .then(response => response.json())
            .then((responseArray) => {
                setProducts(responseArray)
            })
        },
        [] 
    )

    return <>
   
    <h2>List of matching products</h2>
    <article className="products">

    {filteredProducts.map(
            (product) => {
                return  (<Product key={`Product--${product.id}`}
                                        id={product.id} 
                                        name={product.name} 
                                        price={product.price} />)
            }
    )}

    </article>
    </>
}