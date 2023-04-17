import { useEffect, useState } from "react"
import { Customer } from "./Customer.js"
import "./Customers.css"
import { getCustomersSortedByPurchases } from "../ApiManager.js"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomersSortedByPurchases()
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        }, []
    )

    return <>
    <article className="customers">
        {
            customers.map(customer => <Customer id={customer.id} 
                                        fullName={customer?.user.fullName} 
                                        email={customer?.user.email}
                                        userId={customer?.user.id}
                                        />)
        }
    </article>
    </>
}