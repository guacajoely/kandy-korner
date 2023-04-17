import { useEffect, useState } from "react"
import "./products.css"
import { Link } from "react-router-dom"
import { getProducts } from "../ApiManager.js"

export const ProductsOnly = ({ searchTermState }) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        }, [searchTermState]
    )

    useEffect(
        () => {getProducts()
            .then((responseArray) => {
                setProducts(responseArray)
                setFiltered(responseArray)
            })
        },
        [] 
    )

    return <>
   
    <h2>List of matching products</h2>
    <article className="products">

    {filteredProducts.map(
            (product) => {
                return  <section className="product" key={`product--${product.id}`}>
                            <div>
                                <strong>{product.name}</strong> (${product.price})
                                <Link to={`/product/${product.id}`}><button>Show me where</button></Link>
                            </div>
                        </section>
            }
    )}

    </article>
    </>
}