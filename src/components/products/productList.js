import { useEffect, useState } from "react"
import "./products.css"
import { useNavigate } from "react-router-dom"

export const ProductList = ({ searchTermState }) => {

    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [priceyOnly, updatePriceyOnly] = useState(false)
    const navigate = useNavigate()

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)

     //find the employee object for the current user
     const userCustomer = customers.find(customer => customer.userId === userObject.id)

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product?.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        }, [searchTermState]
    )

    useEffect(
        () => {
            //sort in fetch with /products?_sort=name&_order=asc
            // why does this not work??? products?_expand=productType(NO 'S')
            // changing typeId to productTypeId did not work
            // BUT RENAMING productTypes to types and then expand 'type' DOES work
            // what rule is being broken here? no caps?
            fetch('http://localhost:8088/products?_expand=productType&?_sort=name&_order=asc')
            .then(response => response.json())
            .then((responseArray) => {
                //THIS SORT WORKS BECAUSE IT MAKES A COPY OF THE RESPONSE ARRAY FIRST!
                // const sortedArray = [...responseArray].sort((a, b) => (b.name > a.name ? -1 : 1))
                //ATTEMPT 1 TO SORT, NO WORK
                // const sortedArray = responseArray.sort((a, b) => a.name > b.name);
                //ATTEMPT 2 TO SORT, NO WORK
                // const sortedArray = Array.from(responseArray).sort((a, b) => a.name.localeCompare(b.name))
                setProducts(responseArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(() => {fetch('http://localhost:8088/customers')
        .then(response => response.json())
        .then((responseArray) => {
            setCustomers(responseArray)
        })
    }, 
    [] )

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

    {userObject.staff ?
        filteredProducts.map(
            (product) => {
                return <section className="product" key={`product--${product.id}`}>
                            <div><strong>{product.name}</strong> ({product.productType.name}) - ${product.price}</div>
                        </section>
        }) :
            
        filteredProducts.map(
        (product) => {
            return <section className="product" key={`product--${product.id}`}>
                        <div><strong>{product.name}</strong> ({product.productType.name}) - ${product.price}</div>
                        <button onClick={() => {

                                fetch(`http://localhost:8088/purchases`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        customerId: userCustomer.id,
                                        productId: product.id,
                                        quantity: 1
                                    })

                                })
                                .then(response => response.json())
}



                        }>Purchase</button> 
                    </section>
        })     
    }

    {userObject.staff ? 
            <>
                <button onClick={() => navigate("/product/create")}>Add New Product</button>
            </>
            :<>
                <button onClick={() => updatePriceyOnly(true)}>Top Priced</button>
                <button onClick={() => updatePriceyOnly(false)}>Show All</button>
            </>
        }
    </article>
    </>
}