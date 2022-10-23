import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/axios";
import { addUser } from "../features/userSlice";
import { User } from "../interfaces/user.interface";

import "../styles/home.css";


const Home = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [spinner, setSpinner] = useState(false);
    const navigation = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        funcionGetUsers();
    }, []);



    //GET USERS
    const funcionGetUsers = async () => {
        try {
            setSpinner(true);
            const response = await getUsers();
            if (response.data.length) {
                setUsers([...response.data]);
                setSpinner(false);
            }

        } catch (error) {
            setSpinner(false);
            toast.error("There was an unexpected error");
        }
    }


    //DELETE USER
    const functionDeleteUser = async (id: string) => {
        if (window.confirm("¿Are you sure you want to delete this user?") === true) {
            setSpinner(true);
            try {
                await deleteUser(id);
                setSpinner(false);
                toast.success("successfully deleted user");
                funcionGetUsers();
            } catch (error) {
                setSpinner(false);
                toast.error("There was a mistake: " + error);
            }


        }

    }

    //UPDATE USER
    const functionUpdateUser = (user: User) => {
        dispatch(addUser(user));
        navigation("/update-user")
    }

    return (
        <main>

            {!spinner ?
                <>
                    <Link to="/update-user">
                        <button className="btn-create">CREATE USER</button>
                    </Link>
                    <section className="container">

                        {
                            users.map((user: User, index: number) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-header">
                                            <img src={user.avatar} alt="avatar" width={150} />
                                        </div>
                                        <div className="card-body">
                                            <span><strong>First name: </strong>{user.first_name}</span>
                                            <br />
                                            <span><strong>Second name: </strong>{user.second_name}</span>
                                            <br />
                                            <span><strong>Email: </strong>{user.email}</span>
                                            <button className="btn-update" onClick={() => { functionUpdateUser(user) }}>Update user</button>
                                            <button className="btn-delete" onClick={() => { functionDeleteUser(user.id) }}>Delete user</button>
                                        </div>

                                    </div>
                                );
                            })

                        }

                    </section>
                </>
                : <div className="spiner">
                    <div className="loader"></div>
                </div>
            }


        </main>
    );

}


export default Home;