
import { userService } from "../../services/user.service";


//* User
export const SET_USER = 'SET_USER'



const initialState = {
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
    
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        default:
            return state;
    }
}