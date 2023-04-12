import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import { ProductList } from "../products/products.js"
import { ProductForm } from "../products/productForm.js"
import { EmployeeList } from "../employees/EmployeeList.js"
import { NewEmployeeForm } from "../employees/NewEmployeeForm.js"
import { CustomerList } from "../customers/CustomerList.js"
import { CustomerDetails } from "../customers/CustomerDetails.js"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title--name">Kandy Korner</h1>
                    <div>Here to help you rot your teeth out :D</div>

                    <Outlet/>
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
                <Route path="products" element={ <ProductList /> } />
                <Route path="employees" element={ <EmployeeList/> } />
                <Route path="product/create" element={ <ProductForm /> } />
                <Route path="employees/create" element={ <NewEmployeeForm /> } />
                <Route path="customers" element={ <CustomerList/> } />
                <Route path="customers/:customerId" element={ <CustomerDetails/> } />

    
            </Route>
        </Routes>
    )
}