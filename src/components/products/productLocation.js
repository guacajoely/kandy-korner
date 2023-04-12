import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ProductLocations = () => {

    const {productId} = useParams()
    // changing use state to an empty object breaks, why????
    // why did we start initial value of product (customer/employee) with empty object in honey raes?
    const [product, updateProduct] = useState()
    const [locations, updateLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_embed=productLocations&id=${productId}`)
            .then(response => response.json())
            .then((productArray) => {
                const singleProductObject = productArray[0]
                updateProduct(singleProductObject)
            })
        },
        [productId]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                updateLocations(locationArray)
            })
        },
        []
    )

    return <>
        {product?.productLocations.forEach( (productLocation) => { 
            return window.alert(`${productLocation.locationId}`) 
           /* locations.map( (location) => {
                if(location.id === productLocation.locationId){
                    return window.alert(`${location.name}`)
                 
                }
            }) */
        }

)}
    </>

}