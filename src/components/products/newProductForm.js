import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    //create productType state
    const [productTypes, setProductTypes] = useState([])

    //Update/set productType state
    useEffect(
        () => {fetch('http://localhost:8088/productTypes')
                .then(response => response.json())
                .then((responseArray) => {setProductTypes(responseArray)})
        },[])

    // Add the correct default properties to the initial state object
    const [newProduct, update] = useState({
        name: "",
        price: "",
        productTypeId: 0
    })
    // Use the useNavigate() hook so you can redirect the user to the product list after posting a new product
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // Create the object to be saved to the API
        const ticketToSendToAPI = {
        name: newProduct.name,
        price:  parseFloat(newProduct.price, 2),
        productTypeId: newProduct.productTypeId
        }

        // Perform the fetch() to POST the object to the API
        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(response => response.json())
        .then(()=> {
            navigate("/products")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of the product..."
                        value={newProduct.name}
                        onChange={
                            (event) => {
                                const copy = {...newProduct}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of the product..."
                        value={newProduct.price}
                        onChange={
                            (event) => {
                                const copy = {...newProduct}
                                copy.price = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="types">Product Type:</label>

                    <select className="form-control" id="types" name="types" onChange={
                            (event) => {
                                const copy = {...newProduct}
                                copy.productTypeId = event.target.value
                                update(copy)
                            }
                        } >

                        {productTypes.map((type) => {return <option key={`${type.id}`} value={`${type.id}`}>{type.name}</option>})}

                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(event) => {handleSaveButtonClick(event)}}
                className="btn btn-primary">
                Add New Product
            </button>
        </form>
    )
}