import { getPurchases } from "../ApiManager.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export const Customer = ({ id, fullName, email, userId}) => {

    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        getPurchases(id)
            .then((purchasesArray) => {
                setPurchases(purchasesArray)
            })
        }, [id]
    )



    return <section className="customer" key={`customer--${id}`}>
        <div>
         <Link to={`/customers/${userId}`}> Name: {fullName} </Link>
        </div>
        <div>Email: {email} </div>
        <div>Purchases: {purchases?.length} </div>

    </section>
}