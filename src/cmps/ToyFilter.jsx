
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilterBy, 500))


    useEffect(() => {
        debouncedSetFilterRef.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name, price, inStock } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Filter Toys</h2>
            <form onSubmit={onSubmitFilter}>
                <select value={inStock} className="flex justify-center align-center" name="inStock" onChange={(ev) => handleChange(ev)}>
                    <option value="all" >All</option>
                    <option value="inStock" >In Stock</option>
                    <option value="!inStock" >Not in Stock</option>

                </select>

                <input value={name} onChange={handleChange}
                    type="search" placeholder="By Name" id="name" name="name"
                />
                <label htmlFor="price">Price: </label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By Price" id="price" name="price"
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}