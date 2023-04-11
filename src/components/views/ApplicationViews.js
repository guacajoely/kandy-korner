import { EmployeeViews } from "./EmployeeViews.js"
import { CustomerViews } from "./CustomerViews.js"

export const ApplicationViews = () => {

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)
    
        if(userObject.staff) {
            return <EmployeeViews />
        }
    
        else{
            return <CustomerViews />
        }
    
}

