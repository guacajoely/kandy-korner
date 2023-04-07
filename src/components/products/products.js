import { useEffect, useState } from "react"
import "./products.css"

export const ProductList = () => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [priceyOnly, updatePriceyOnly] = useState(false)

    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((responseArray) => {
                //HAD TO MAKE A COPY OF RESPONSE, THEN SORT
                const sortedArray = [...responseArray].sort((a, b) => (b.name > a.name ? -1 : 1))
                //ATTEMPT 1 TO SORT, NO WORK
                // const sortedArray = responseArray.sort((a, b) => a.name > b.name);
                //ATTEMPT 2 TO SORT, NO WORK
                // const sortedArray = Array.from(responseArray).sort((a, b) => a.name.localeCompare(b.name))
                setProducts(sortedArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    //When the employee clicks on a button labeled "Top Priced" Then only products that cost more than $2.00 per unit should be displayed
    useEffect(
        () => {
            if(priceyOnly){
                const priceyProductsArray = products.filter(product => {
                    return product.price > 2.0
                })
                setFiltered(priceyProductsArray)
            }
            else{
                setFiltered(products)
            }
        },
        [priceyOnly, products]
    )


    return <>
    <h2>List of products</h2>
    <article className="products">

    {filteredProducts.map(
            (product) => {
                return <section className="product" key={`product--${product.id}`}>
                            <div>{product.name} - ${product.price}</div>
                        </section>
            }
    )}
    <button onClick={() => updatePriceyOnly(true)}>Top Priced</button>
    <button onClick={() => updatePriceyOnly(false)}>Show All</button>
    </article>
    </>
}