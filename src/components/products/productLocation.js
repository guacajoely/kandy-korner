import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductLocations } from "../ApiManager.js"

export const ProductLocations = () => {

    const {productId} = useParams()
    // changing use state to an empty object breaks, why????
    // why did we start initial value of product (customer/employee) with empty object in honey raes?
    const [productLocations, updateProductLocations] = useState()

    useEffect(
        () => {
            getProductLocations(productId)
            .then((productLocationArray) => {
                updateProductLocations(productLocationArray)
            })
        },
        [productId]
    )

    if(productLocations){
    const locationList = productLocations?.map((productLocation) => { 
        return productLocation.location.address}).join("\n")
    return window.alert(`${locationList}`)
    }
    
}