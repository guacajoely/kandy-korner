import { useEffect, useState } from "react"
import { Customer } from "./Customer.js"
import "./Customers.css"
import { getCustomersWithPurchases } from "../ApiManager.js"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomersWithPurchases()
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        }, []
    )

    const sortedCustomers = customers.sort((b, a) => a.purchases.length - b.purchases.length);


    return <>
    <article className="customers">
        {
            sortedCustomers.map(customer => <Customer id={customer.id} 
                                        fullName={customer?.user.fullName} 
                                        email={customer?.user.email}
                                        userId={customer?.user.id}
                                        purchaseCount={customer?.purchases.length}
                                        />)
        }
    </article>
    </>
}