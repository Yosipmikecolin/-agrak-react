import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

const store = configureStore({
    reducer: {
        stateUser: userReducer
    }
});


export default store;