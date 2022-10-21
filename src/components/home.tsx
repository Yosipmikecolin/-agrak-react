import { useEffect, useState } from "react";
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


    console.log("users", users)

    return (
        <main>
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
                                    <button className="btn-delete">Delete user</button>
                                </div>

                            </div>
                        );
                    })

                }

            </section>
            <Link to="/create-user">
                <button className="btn-create">CREATE USER</button>
            </Link>

        </main>
    );

}


export default Home;