import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {

    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    //Provide initial state for customer profile 
    const [profile, updateProfile] = useState({
        loyaltyNumber: 0,
        userId: 0
    })

    //Get employee info from API (can't use other fetch because it includes user expansion)
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${customerId}`)
            .then(response => response.json())
            .then((customerArray) => {
                const singleCustomer = customerArray[0]
                updateProfile(singleCustomer)
            })
        },
        []
    )
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // FEEDBACK - Add the following state and observer code.
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    /////////////////////////////////////////////////////////////////////////////////////////////

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //PUT the new customer profile to replace the old loyalty id in the database
            fetch(`http://localhost:8088/customers/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)

            })
            .then(response => response.json())

            // FEEDBACK - chain the following Promise code to your PUT operation.
            .then(() => {
                setFeedback("Employee profile successfully saved")
            })
    }


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response => response.json())
            .then((customerArray) => {
                const singleCustomer = customerArray[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )

    return <>

     {/* FEEDBACK - Add the following JSX above the profile form element */}
     <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>


    <section className="customer">
                <header className="customer__header">{customer?.user?.fullName}</header>
                <div>Email: {customer?.user?.email} </div>

                <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Loyalty Number:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.loyaltyNumber}
                        onChange={
                            (event) => {
                                // TODO: Update rate property
                                const copy = {...profile}
                                copy.loyaltyNumber = parseInt(event.target.value)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>


                <button onClick={(event) => handleSaveButtonClick(event)}
                className="btn btn-primary">
                Update Loyalty #
                </button>
            </section>
        </>

}