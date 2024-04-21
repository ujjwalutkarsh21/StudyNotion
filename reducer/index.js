import {combineReducers} from "@reduxjs/toolkit"
// import authReducer from "../slices/authSlice"
// import courseReducer from "../slices/courseSlice"
// import profileRuducer from "../slices/profileSlice"
// import cartReducer from "../slices/cartSlice"
// import viewCourseReducer from "../slices/viewCourseSlice"
import authSlice from "../slices/authSlice"
import courseSlice from "../slices/courseSlice"
import profileSlice from "../slices/profileSlice"
import cartSlice from "../slices/cartSlice"
import viewCourseSlice from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
    auth:authSlice.reducer,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse: viewCourseSlice,
})
export default rootReducer