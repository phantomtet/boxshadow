const initialState = {
    shiftRight: 0,
    shiftDown: 0,
    spread: 0,
    blur: 0,
    opacity: 0,
    inset: false
}
export const attributeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'shiftRight':
            return {...state, shiftRight: action.value}
        case 'shiftDown':
            return {...state, shiftDown: action.value}
        case 'spread':
            return {...state, spread: action.value}    
        case 'blur':
            return {...state, blur: action.value}
        case 'opacity':
            return {...state, opacity: action.value}
        case 'inset':
            return {...state, inset: action.value}
        default:
            return state
    }
}