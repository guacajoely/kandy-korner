import { useEffect, useState } from "react"

export const ProductCart = () => {

    //GET customer list to get the customerId from the current user
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])

    useEffect(() => {fetch('http://localhost:8088/customers')
        .then(response => response.json())
        .then((responseArray) => {
            setCustomers(responseArray)
        })
    }, 
    [] )

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)

    //find the employee object for the current user
    const userCustomer = customers.find(customer => customer.userId === userObject.id)

    useEffect(() => {
        fetch(`http://localhost:8088/purchases?customerId=${userCustomer?.id}&_expand=product`)
        .then(response => response.json())
        .then((responseArray) => {
            setPurchases(responseArray)
        })
    }, 
    [userCustomer] )

    // return mapped purchases with JSX
    return <>
   
    <h2>My Orders</h2>
    <article className="products">

    {purchases.map(
        (purchase) => {
            return <section className="purchase" key={`purchase--${purchase.id}`}>
                        <div><strong>{purchase.product.name}</strong> (${purchase.product.price.toFixed(2)})</div>
                    </section>
        })
    }
            
       </article>
    </>
}