import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { getUsers } from "../config/axios";
import { User } from "../interfaces/user.interface";
import "../styles/home.css";


const Home = () => {

    const [users, setUsers] = useState<User[]>([]);

    //GET DATA
    useEffect(() => {
        getUsers().then((response) => {
            setUsers([...response.data]);
        });
    }, []);


    const deleteUser = () => {
        if (window.confirm("Are you sure you want to delete this user?") === true) {
            toast.success("Are you sure you want to delete this user?")
        }

    }



    return (
        <main>

            {users.length ?
                <>
                    <Link to="/create-user">
                        <button className="btn-create">CREATE USER</button>
                    </Link>
                    <section className="container">


                        {
                            users.map((user: User) => {
                                return (
                                    <div className="card">
                                        <div className="card-header">
                                            <img src={user.avatar} alt="avatar" width={150} />
                                        </div>
                                        <div className="card-body">
                                            <span><strong>First name: </strong>{user.first_name}</span>
                                            <br />
                                            <span><strong>Second name: </strong>{user.second_name}</span>
                                            <br />
                                            <span><strong>Email: </strong>{user.email}</span>
                                            <button className="btn-update">Update user</button>
                                            <button className="btn-delete" onClick={deleteUser}>Delete user</button>
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