import { compose, legacy_createStore as createStore } from "redux"
import { toyService } from "../services/toy.service.js"

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TOYS = 'SET_TOYS'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    sortBy: 'name',
    isLoading: false,
}

export function appReducer(state = initialState, action) {

    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.toys }
        case ADD_TOY:
            return { ...state, toys: [action.toy, ...state.toys] }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case UPDATE_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        case SET_MAX_PAGE:
            return { ...state, maxPage: action.maxPage }

        default:
            return state
    }

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers())
