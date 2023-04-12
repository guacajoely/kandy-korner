import { Link } from "react-router-dom"

export const Product = ({ id, name, price }) => {
    return <section className="product" key={`product--${id}`}>
    <div>
        <strong>{name}</strong> (${price})
        <Link to={`/product/${id}`}><button>Show me where</button></Link>
    </div>
</section>
}