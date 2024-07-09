

import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_MAX_PAGE, SET_TOYS, store, UPDATE_TOY } from "../store"



export function loadToys(filterSort) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterSort)
        .then(({ toys, maxPage }) => {
            store.dispatch({
                type: SET_TOYS,
                toys
            })
            _setToysData(maxPage)
            return toys
        })
        .catch(err => {
            console.error('Cannot load toys:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(({ maxPage, savedToy }) => {
            store.dispatch({
                type,
                toy: savedToy
            })
            _setToysData(maxPage)
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(({ maxPage }) => {
            store.dispatch({
                type: REMOVE_TOY,
                toyId
            })
            _setToysData(maxPage)
        })
        .catch(err => {
            console.error('Cannot remove toy:', err)
            throw err
        })
}

export function updateToy(toy) {
    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({
                type: UPDATE_TOY,
                toy: savedToy
            })
        })


}

function _setToysData(maxPage) {
    store.dispatch({
        type: SET_MAX_PAGE,
        maxPage
    })
}
