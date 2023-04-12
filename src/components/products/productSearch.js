export const ProductSearch = ({setterFunction}) => {
    return (<div>
                <label htmlFor="candy-search"><h2>What candy are you looking for?</h2></label>
                <div><input type="text" placeholder="Enter candy name..." onChange={
                    (event) => {setterFunction(event.target.value)}
                } />
                </div>
            </div>
    )
}