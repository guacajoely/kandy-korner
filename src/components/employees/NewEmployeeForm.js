import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEmployee, createUser, getLocations, getUsers } from "../ApiManager.js"

export const NewEmployeeForm = () => {

    //create locationArray state
    const [locationArray, setLocationArray] = useState([])

    //Update/set locationArray state
    useEffect(
        () => {getLocations()
                .then((responseArray) => {setLocationArray(responseArray)})
        },[])

    //create current users state (so we can manually assign a new user id based on the length of the array)
    const [userArray, setUserArray] = useState([])

    //Update/set locationArray state
    useEffect(
        () => {getUsers()
                .then((responseArray) => {setUserArray(responseArray)})
        },[])


    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [user, updateUser] = useState({
        id: 1,
        fullName: "",
        email: "",
        isStaff: true
    })

    const [employee, updateEmployee] = useState({
        userId: 0,
        payRate: 0,
        locationId: 0,
        startDate: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        //set new user ID based on lentgh of userArray
        const newUserId = userArray.length + 1

        // TODO: Create the object to be saved to the API
        const userToSendToAPI = {
            id: newUserId,
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }

        // TODO: Create the object to be saved to the API
        const employeeToSendToAPI = {
            userId: newUserId,
            payRate: employee.payRate,
            locationId: employee.locationId,
            startDate: employee.startDate
        }


        // TODO: Perform the fetch() to POST the USER object to the API
        return createUser(userToSendToAPI)

        // TODO: Perform the fetch() to POST the EMPLOYEE object to the API
        .then((createEmployee(employeeToSendToAPI))

        // NAVIGATE BACK TO EMPLOYEE LIST
        .then(()=> {
            navigate("/employees")
        }))
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Employee Form</h2>

            {/* input field for new USER name */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
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
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* input field for new USER email */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
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
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>

            {/* input field for new EMPLOYEE Location */}
            <fieldset>
            <div className="form-group">
                    <label htmlFor="location">Location:</label>

                    <select className="form-control" id="locations" name="locations" onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.locationId = event.target.value
                                updateEmployee(copy)
                            }
                        } >

                        <option value="0">Please select a location</option>
                        {locationArray.map((location) => {return <option value={`${location.id}`}>{location.address}</option>})}

                    </select>
                </div>
            </fieldset>

            
            {/* input field for new EMPLOYEE name */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.startDate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>

                  {/* input field for new EMPLOYEE name */}
                  <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.payRate = event.target.value
                                updateEmployee(copy)
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