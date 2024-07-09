import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"


import { PaginationBtns } from "../cmps/PaginationBtns.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToysList.jsx"
import { ToySort } from "../cmps/ToySort.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { SET_FILTER_BY } from "../store/store.js"


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toys)
    const isLoading = useSelector(storeState => storeState.isLoading)

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.filterBy)
    const maxPage = useSelector((storeState) => storeState.maxPage)
    const dispatch = useDispatch()

    useEffect(() => {
        setFilterSort({ ...defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadToys(filterBy)
            .catch(() => {
                showErrorMsg('Could not load toys')
            })

    }, [filterBy])

    function onRemoveToy(toyId) {
        const ans = confirm('Do you want to delete this toy?')
        if (!ans) return
        removeToy(toyId)
            .then(() => {
                console.log('removed toy ' + toyId);
                showSuccessMsg(`Removed toy with ${toyId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the toy'))
    }

    function setFilterSort(filterBy) {
        const action = {
            type: SET_FILTER_BY,
            filterBy,
        }
        dispatch(action)
    }

    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        setFilterSort({ ...filterBy, pageIdx: newPageIdx, })
    }
console.log('toys:', toys);
    return (
        <section className="toy-index">
            <ToyFilter filterBy={defaultFilter} onSetFilterBy={setFilterSort} />
            <ToySort filterBy={defaultFilter} onSetFilterBy={setFilterSort} />

            <Link to="/toy/edit" className="add-toy-btn btn" >Add Toy</Link>
            <h2>Toys List</h2>
            <PaginationBtns filterSortBy={filterBy} onChangePageIdx={onChangePageIdx} />
            {!isLoading ?
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                : <div>Loading...</div>
            }
        </section>
    )
}