

import { toyService } from "../../services/toy.service.js"
import { UPDATE_TOY,ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_TOYS,SET_SORT_BY, SET_FILTER_BY,} from "../reducers/toy.reducer.js"
import { store } from '../store.js'



export function loadToys(pageIdx) {
    const { filterBy, sortBy } = store.getState().toyModule
  
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  
    return toyService.query(filterBy, sortBy, pageIdx)
      .then(toys => {
        console.log(toys)
        store.dispatch({ type: SET_TOYS, toys })
      })
      .catch(err => {
        console.log('toy action -> Cannot load toys')
        throw err
      })
      .finally(() => {
        console.log("HHI")
        setTimeout(() => {
          store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 350)
      })
  }

  export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
      .then(toyToSave => {
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
      })
      .catch(err => {
        console.log('toy action -> Cannot save toy', err)
        throw err
      })
  }

export function removeToy(toyId) {
    return toyService
      .remove(toyId)
      .then(() => {
        store.dispatch({ type: REMOVE_TOY, toyId })
      })
      .catch(err => {
        console.log('toy action -> Cannot remove toy', err)
        throw err
      })
  }



export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
  }
  
  
  export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
  }
  