import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ProductLocations = () => {

    const {productId} = useParams()
    // changing use state to an empty object breaks, why????
    // why did we start initial value of product (customer/employee) with empty object in honey raes?
    const [productLocations, updateProductLocations] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?_expand=product&_expand=location&productId=${productId}`)
            .then(response => response.json())
            .then((productLocationArray) => {
                updateProductLocations(productLocationArray)
            })
        },
        [productId]
    )

    const locationList = productLocations?.map((productLocation) => { 
        return productLocation.location.address}).join(" ")

    return window.alert(`${locationList}`)
    
}