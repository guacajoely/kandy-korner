import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee.js"
import "./Employees.css"
import { useEffect, useState } from "react"
import { getEmployees } from "../ApiManager.js"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    const getAllEmployees = () => {
        getEmployees()
        .then((employeeArray) => {
            setEmployees(employeeArray)
        })
    }

    useEffect(() => {
        
        getAllEmployees()

        }, []
    )

 

    return <>
    <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                                        id={employee.id} 
                                        fullName={employee.user.fullName} 
                                        email={employee.user.email}
                                        payRate={employee.payRate}
                                        startDate={employee.startDate}
                                        location={employee.location.address} 
                                        getAllEmployees={getAllEmployees}
                                        />)
        }
    </article>
    <button onClick={() => navigate("/employees/create")}>Add an employee</button>
    </>
}