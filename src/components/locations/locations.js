import { useEffect, useState } from "react"
import "./locations.css"

export const LocationList = () => {

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
            .then(response => response.json())
            .then((responseArray) => {
                setLocations(responseArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
    <h2>List of Locations</h2>
    <article className="locations">

    {locations.map(
            (location) => {
                return <section className="location" key={`location--${location.id}`}>
                            <header>Address: {location.address}</header>
                            <footer>Square Footage: {location.sqFeet}</footer>
                        </section>
            }
    )}

    </article>
    </>
}