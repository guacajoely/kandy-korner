import { useEffect, useState } from "react"
import "./products.css"
import { Link } from "react-router-dom"

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
        () => {fetch('http://localhost:8088/products?_expand=productType&?_sort=name&_order=asc')
            .then(response => response.json())
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