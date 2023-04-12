import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import { ProductList } from "../products/products.js"
import { ProductForm } from "../products/productForm.js"
import { ProductContainer } from "../products/productContainer.js"
import { ProductLocations } from "../products/productLocation.js"

export const CustomerViews = () => {
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
                <Route path="product/create" element={ <ProductForm /> } />
                <Route path="product/find" element={ <ProductContainer /> } />
                <Route path="product/:productId" element={ <ProductLocations/> } />

    
            </Route>
        </Routes>
    )
}