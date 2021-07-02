import { combineReducers } from "redux";
import { attributeReducer } from "./attributeReducer";
import { layerFocusReducer } from "./layerFocusReducer";
export const combineReducer = combineReducers({
    layerFocus: layerFocusReducer,
    attribute: attributeReducer,
})
