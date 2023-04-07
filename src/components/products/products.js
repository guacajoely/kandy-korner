import { useEffect, useState } from "react"
import "./products.css"

export const ProductList = () => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [priceyOnly, updatePriceyOnly] = useState(false)

    useEffect(
        () => {
            //sort in fetch with /products?_sort=name&_order=asc
            // why does this not work??? products?_expand=productType(NO 'S')
            // changing typeId to productTypeId did not work
            // BUT RENAMING productTypes to types and then expand 'type' DOES work
            // what rule is being broken here? no caps?
            fetch('http://localhost:8088/products?_expand=type')
            .then(response => response.json())
            .then((responseArray) => {
                //THIS SORT WORKS BECAUSE IT MAKES A COPY OF THE RESPONSE ARRAY FIRST!
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
                            <div><strong>{product.name}</strong> ({product.type.name}) - ${product.price}</div>
                        </section>
            }
    )}
    <button onClick={() => updatePriceyOnly(true)}>Top Priced</button>
    <button onClick={() => updatePriceyOnly(false)}>Show All</button>
    </article>
    </>
}