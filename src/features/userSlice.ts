import { createSlice } from '@reduxjs/toolkit';
import { Form } from '../interfaces/form.interface';


const initialState: Form = {
    first_name: "",
    avatar: "",
    second_name: "",
    email: ""
}

const userSlice = createSlice({
    name: "stateUser",
    initialState,
    reducers: {

        addUser: (state: Form, action) => {
            state.id = action.payload.id;
            state.first_name = action.payload.first_name;
            state.second_name = action.payload.second_name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
        },


        clearUser: (state: Form) => {
            state.id = "";
            state.first_name = "";
            state.second_name = "";
            state.email = "";
            state.avatar = "";
        }
    }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;