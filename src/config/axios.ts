import axios from "axios"
import { Form } from "../interfaces/form.interface";
import { User } from "../interfaces/user.interface";

const baseURL = "https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users";

export const getUsers = () => {
    return axios.get<User[]>(baseURL);
}


export const getUser = () => {

}


export const updateUser = (user: Form) => {
    return axios.post<User[]>(baseURL, user);
}


export const deleteUser = () => {

}


