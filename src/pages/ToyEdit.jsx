import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.get(params.toyId)
            console.log('toy:', toy);
            setToyToEdit(toy)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = value === '' ? '' : +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            const savedToy = await saveToy(toyToEdit)
            navigate('/toy')
            showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot save toy')
            console.log('err:', err)
        }
    }


    const { name, price } = toyToEdit
    return (
        <section className="toy-edit">
            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />
                <button>Save</button>
            </form>
        </section>
    )
}