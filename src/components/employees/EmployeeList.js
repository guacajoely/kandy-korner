import { useNavigate } from "react-router-dom"
import { Employee } from "./Employee.js"
import "./Employees.css"
import { useEffect, useState } from "react"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8088/users?isStaff=true')
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        }, []
    )

    return <>
    <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                                        id={employee.id} 
                                        fullName={employee.fullName} 
                                        email={employee.email} />)
        }
    </article>
    <button onClick={() => navigate("/employees/create")}>Add an employee</button>
    </>
}