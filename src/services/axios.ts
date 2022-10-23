import axios from "axios"
import { Form } from "../interfaces/form.interface";
import { User } from "../interfaces/user.interface";

const baseURL = "https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users/";

export const getUsers = () => {
    return axios.get<User[]>(baseURL);
}


export const createUser = (user: Form) => {
    return axios.post<User[]>(baseURL, user);
}


export const updateUser = (user: Form, id: string) => {
    return axios.put<User[]>(baseURL + id, user);
}



export const deleteUser = (id: string) => {
    return axios.delete(baseURL + id);
}


