import { useState } from "react"
import { ProductList } from "./products.js"
import { ProductSearch } from "./productSearch.js"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
     <ProductSearch setterFunction={setSearchTerms} />
    <ProductList searchTermState={searchTerms}/>  

    </>
}