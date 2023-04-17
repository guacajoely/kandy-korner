import { deleteEmployee } from "../ApiManager.js"

export const Employee = ({ id, fullName, email, payRate, startDate, location, getAllEmployees}) => {
    return <section className="employee" key={`/employees/${id}`}>
        <div>Name: {fullName} </div>
        <div>Email: {email} </div>
        <div>Pay Rate: {payRate} </div>
        <div>Start Date: {startDate} </div>
        <div>Location: {location} </div>
        <button onClick={() => {
                deleteEmployee(id)
                .then(getAllEmployees)
            }} className="employee__delete">Fire Employee</button>
    </section>
}