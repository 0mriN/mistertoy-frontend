import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { useEffect, useState } from "react"


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadToy = async () => {
            try {
                const loadedToy = await toyService.get(params.toyId)
                setToy(loadedToy)
            } catch (err) {
                console.error('err:', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            }
        }
        loadToy()
    }, [params.toyId, navigate])

    function onBack() {
        navigate('/toy')
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">

            <h1>Toy Name: {toy.name}</h1>
            <h2>Toy Price: {toy.price}</h2>
            <img src={`https://robohash.org/${toy._id}?set=set1`} alt="robot pic.."></img>

            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back</button>

        </section>
    )
}