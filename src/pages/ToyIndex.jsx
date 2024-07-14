
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader.jsx'
import { PaginationBtns } from '../cmps/PaginationBtns.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, removeToy, setFilter, setSort } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToysList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  const [pageIdx, setPageIdx] = useState(0)

  useEffect(() => {
    try {
      loadToys(pageIdx)

    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    }
  }, [filterBy, sortBy, pageIdx])

  async function onRemoveToy(toyId) {
    try {
      const removedToy = await removeToy(toyId)
      loadToys(pageIdx)
      showSuccessMsg('Toy removed')
    } catch (err) {
      console.log('Cannot remove toy', err)
      showErrorMsg('Cannot remove toy')
    }
  }

  function onSetFilter(filterBy) {
    setFilter(filterBy)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }
  if (!toys) return <Loader />
  return (
    <section className="toy-index">
      <ToyFilter
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        sortBy={sortBy}
        onSetSort={onSetSort}
      />
      <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
        <button style={{ marginInline: 0 }}>
          <Link to="/toy/edit" className="add-toy-btn btn">Add Toy</Link>
        </button>
      </div>
      {/* {isLoading && <Loader />}
      {!isLoading &&  */}
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      {/* } */}
      <PaginationBtns
        pageIdx={pageIdx}
        setPageIdx={setPageIdx}
        toysLength={toys.length}
      />
    </section>
  )
}
