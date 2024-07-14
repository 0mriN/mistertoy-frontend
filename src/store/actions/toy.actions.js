

import { toyService } from "../../services/toy.service.js"
import { UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_TOYS, SET_SORT_BY, SET_FILTER_BY, } from "../reducers/toy.reducer.js"
import { store } from '../store.js'



export async function loadToys(pageIdx) {
  const { filterBy, sortBy } = store.getState().toyModule

  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const toys = await toyService.query(filterBy, sortBy, pageIdx)
    console.log(toys)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('toy action -> Cannot load toys')
    throw err
  } finally {
    setTimeout(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }, 350)
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.log('toy action -> Cannot save toy', err)
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    const res = await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}



export function setFilter(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}


export function setSort(sortBy = toyService.getDefaultSort()) {
  store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
