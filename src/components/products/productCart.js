import { useEffect, useState } from "react"
import { getCustomers, getPurchases } from "../ApiManager.js"

export const ProductCart = () => {

    //GET customer list to get the customerId from the current user
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])

    useEffect(() => {getCustomers()
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
        getPurchases(userCustomer?.id)
        .then((responseArray) => {
            setPurchases(responseArray)
        })
    }, 
    [userCustomer] )



    function sortPurchases(arrayOfPurchases){

        let newArray = [];

        arrayOfPurchases.forEach((purchase)=>{
             
        // Check if there are any purchases in newArray that contain the same productId
           if(newArray.some((object)=>{ return object["productId"] === purchase["productId"] })){
               
            // If yes! then increase the quantity by 1
                newArray.forEach((newPurchase)=>{
                    if(newPurchase["productId"] === purchase["productId"]){ 
                        newPurchase["quantity"]++
                    }
                })  
           }
           
           // If not! Then create a new purchase, set the quantity to 1, and push it to the new array
           else{
             let copy = purchase
             copy["quantity"] = 1
             newArray.push(copy);
           }
        })
          
        //return our new array when we're done
        return newArray
      }

      
      const sortedPurchases = sortPurchases(purchases)

    

    // return mapped purchases with JSX
    return <>
   
    <h2>My Orders</h2>
    <article className="products">

    {sortedPurchases.map(
        (purchase) => {
            return <section className="purchase" key={`purchase--${purchase?.id}`}>
                        <div><strong>{purchase.product.name}</strong> x{purchase.quantity}  (${purchase.product.price.toFixed(2)} each)</div>
                    </section>
        })
    }
            
       </article>
    </>
}