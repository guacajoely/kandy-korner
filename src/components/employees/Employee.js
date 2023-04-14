import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email, payRate, startDate, location, getAllEmployees}) => {
    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}> Name: {fullName} </Link>
         </div>
        <div>Email: {email} </div>
        <div>Pay Rate: {payRate} </div>
        <div>Start Date: {startDate} </div>
        <div>Location: {location} </div>
        <button onClick={() => {
                fetch(`http://localhost:8088/employees/${id}`, {
                    method: "DELETE"
                })
                .then(getAllEmployees)
            }} className="employee__delete">Fire Employee</button>
    </section>
}