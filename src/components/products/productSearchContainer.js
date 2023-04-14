import { useState } from "react"
import { ProductSearch } from "./productSearch.js"
import { ProductsOnly } from "./productsSearchList.js"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <ProductsOnly searchTermState={searchTerms}/>  
    </>
}