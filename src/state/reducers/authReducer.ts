// (initial state, action: {type, payload} )

import { User } from "firebase/auth"

const reducer = (state = undefined, action: {type: string, payload: User}) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return undefined;
        default:
            return state
    }
}

export default reducer;