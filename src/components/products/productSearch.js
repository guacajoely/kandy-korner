export const ProductSearch = ({setterFunction}) => {
    return (<div>
                <label htmlFor="candy-search">What candy are you looking for?</label>
                <div><input type="text" placeholder="Enter candy name..." onChange={
                    (event) => {setterFunction(event.target.value)}
                } />
                </div>
            </div>
    )
}