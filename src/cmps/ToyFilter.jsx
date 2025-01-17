
import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { ToySort } from './ToySort.jsx'

const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'select-multiple') {
      console.log('target.selectedOptions:', target.selectedOptions)
      value = Array.from(target.selectedOptions, option => option.value || [])
      console.log('value:', value)
    }
    value = (type === 'number') ? +value || '' : value
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { name, inStock, labels } = filterByToEdit

  return (
    <section className="toy-filter">
      <h3>Toys Filter/Sort</h3>
      <form onSubmit={onSubmitFilter}>
        <div className="filter-input-wrapper">
          <input
            onChange={handleChange}
            value={name}
            type="text"
            placeholder="Search"
            name="name"
          />
        </div>

        <select name="inStock" value={inStock || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Not in stock</option>
        </select>

        <div>
          <select
            multiple
            name="labels"
            value={labels || []}
            onChange={handleChange}
          >
            <option value="">Labels</option>
            <>
              {toyLabels.map(label => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </>
          </select>
        </div>
      </form>
      <ToySort sortBy={sortBy} onSetSort={onSetSort} />
    </section>
  )
}
