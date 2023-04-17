import { useEffect, useState } from "react"
import "./products.css"
import { useNavigate } from "react-router-dom"
import { createPurchase, getCustomers, getProducts } from "../ApiManager.js"

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
     console.log(userCustomer)

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
            getProducts()
            .then((responseArray) => {
                //ORIGINAL SORT METHOD
                // const sortedArray = [...responseArray].sort((a, b) => (b.name > a.name ? -1 : 1))
                setProducts(responseArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(() => {getCustomers()
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

                        <div><strong>{product.name}</strong> ({product.productType.name}) - ${product.price}
                        <button onClick={() => {
                    
                            createPurchase(userCustomer.id, product.id)

                        }}>Purchase</button> 
                        </div>
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