import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewEmployeeForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [user, update] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Create the object to be saved to the API
        const userToSendToAPI = {
        fullName: user.fullName,
        email: user.email,
        isStaff: true
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
        .then(response => response.json())
        .then(()=> {
            navigate("/employees")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Employee Form</h2>

            {/* input field for new employee name */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={user.fullName}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.fullName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* input field for new employee Location */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={user.email}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button 
                onClick={(event) => {handleSaveButtonClick(event)}}
                className="btn btn-primary">
                Add Employee
            </button>
        </form>
    )
}