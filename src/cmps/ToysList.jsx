import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy, onToggleToy }) {


    if (!toys.length) return <p>No toys to show...</p>
    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} onToggleToy={() => onToggleToy(toy)} />
                    <section>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}