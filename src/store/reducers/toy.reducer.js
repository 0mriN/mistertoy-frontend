import { toyService } from "../../services/toy.service"



export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'



const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort(),
    isLoading: false,
}

export function toyReducer(state = initialState, action={}) {
    let toys
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
            return { ...state, filterBy: { ...action.filterBy } }
        case SET_SORT_BY:
            return { ...state, sortBy: { ...action.sortBy } }
        case SET_IS_LOADING:
            return { ...state, isLoading: { ...state.isLoading,...action.isLoading } }

        default:
            return state
    }

}
// ...state.filterBy,