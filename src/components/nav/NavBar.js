import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav.js"
import { CustomerNav } from "./CustomerNav.js"

export const NavBar = () => {

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)
    
        if(userObject.staff) {
            return <EmployeeNav />
        }
    
        else{
            return <CustomerNav />
        }
}

