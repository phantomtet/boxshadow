
export const layerFocusReducer = (state = 0, action) => {
    if (action.type) return action.type
    else return state
}