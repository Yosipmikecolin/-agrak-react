import { useState, useEffect } from "react";
import { Formik } from 'formik';
import { Form } from '../interfaces/form.interface';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { clearUser } from "../features/userSlice";
import "../styles/update.css";
import { Avatars } from "../interfaces/avatar.interface";

const Update = () => {

    const stateUser: Form = useSelector((state: any) => state.stateUser);
    const [submit, setSubmit] = useState(false);
    const [valueAvatar, setValueAvatar] = useState<string>("");
    const [values, setValues] = useState<Form>({ first_name: '', second_name: '', email: '', avatar: "" });
    const [opacityModal, setOpacityModal] = useState("0");
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);




    useEffect(() => {
        setValues({ ...stateUser });
        setValueAvatar(stateUser.avatar ? stateUser.avatar : "");
    }, [])



    //LIST AVATAR
    const avatars: Avatars[] = [

        {
            id: 1,
            urlAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 2,
            urlAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }, {
            id: 3,
            urlAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        }, {
            id: 4,
            urlAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        }, {
            id: 5,
            urlAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        }, {
            id: 6,
            urlAvatar: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        }

    ]



    const selectAvatar = (urlAvatar: string) => {
        setValueAvatar(urlAvatar)
        closeModal();
        toast.success("successfully changed avatar");
    }



    const redirectHome = () => {
        navigation("/");
        dispatch(clearUser());
    }


    const searchAvatar = () => {
        setOpacityModal("1");

    }

    const closeModal = () => {
        setOpacityModal("0");
    }



    const submitUser = async (values: Form) => {
        if (stateUser.id) {
            try {
                setLoader(true);
                values.avatar = valueAvatar;
                const response = await updateUser(values, stateUser.id);
                if (response.status === 200 && response.data) {
                    setLoader(false);
                    toast.success("user updated successfully");
                    dispatch(clearUser());
                    navigation("/");
                }
            } catch (error) {
                setLoader(false);
                toast.error("There was an error creating the user: " + error);
            }
        } else {
            try {
                setLoader(true);
                values.avatar = valueAvatar;
                const response = await createUser(values);
                if (response.status === 201 && response.data) {
                    setLoader(false);
                    toast.success("User created successfully");
                    dispatch(clearUser());
                    navigation("/");
                }
            } catch (error) {
                setLoader(false);
                toast.error("There was an error creating the user: " + error);
            }
        }

    }



    return (
        <section className="container-updated">
            <div className="container-list-avatar" style={{ opacity: opacityModal, zIndex: (opacityModal === "0") ? "0" : "1" }}>
                <div className="list-avatar">
                    <button className="btn-modal" onClick={closeModal}>close</button>
                    <div className="list">
                        {avatars.map((avatar: Avatars) => {
                            return (
                                <img src={avatar.urlAvatar} className="card-avatar" alt="avatar" onClick={() => { selectAvatar(avatar.urlAvatar) }} />
                            )
                        })}
                    </div>
                </div>
            </div>
            <Formik
                enableReinitialize
                initialValues={{ ...values }}
                validate={values => {
                    const errors: any = {};
                    if (!values.first_name) {
                        errors.first_name = 'Required';
                    }

                    if (!values.second_name) {
                        errors.second_name = 'Required';
                    }

                    if (!values.email) {
                        errors.email = 'Required';
                    }


                    return errors;
                }}
                onSubmit={submitUser}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <button className="btn-back" type="button" onClick={redirectHome}>
                            back
                        </button>
                        <h1>{stateUser.id ? "Update user" : "Create user"}</h1>
                        <input type="text"
                            name='first_name'
                            placeholder="Fist name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                        />
                        <span className='error'>{errors.first_name && touched.first_name && errors.first_name}</span>

                        <input type="text"
                            placeholder="Second name"
                            name='second_name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.second_name}
                        />
                        <span className='error'>{errors.second_name && touched.second_name && errors.second_name}</span>

                        <input type="email"
                            placeholder="Email"
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <span className='error'>{errors.email && touched.email && errors.email}</span>

                        <input
                            type="text"
                            placeholder="Avatar"
                            value={valueAvatar}
                            onClick={searchAvatar}
                        />
                        <span className='error'>{submit && !valueAvatar && "Required"}</span>


                        <button type='submit' className="btn-save" onClick={() => { setSubmit(true) }}>
                            {loader ? <div className="loader-btn"></div> : "UPDATE"}
                        </button>
                    </form>
                )}
            </Formik>
        </section>
    );

}


export default Update;