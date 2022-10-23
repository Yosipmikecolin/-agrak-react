import { useState, useEffect } from "react";
import { Formik } from 'formik';
import { Form } from '../interfaces/form.interface';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { clearUser } from "../features/userSlice";
import "../styles/update.css";
import { User } from "../interfaces/user.interface";


const Update = () => {

    const stateUser: Form = useSelector((state: any) => state.stateUser);
    const [values, setValues] = useState<Form>({ first_name: '', second_name: '', email: '', avatar: '' });
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        setValues({ ...stateUser });
    }, [])



    const submitUser = async (values: Form) => {
        if (stateUser.id) {
            try {
                setLoader(true);
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


    const redirectHome = () => {
        navigation("/");
        dispatch(clearUser());
    }


    return (
        <section className="container-updated">
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

                    if (!values.avatar) {
                        errors.avatar = 'Required';
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
                            name='avatar'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.avatar}
                        />
                        <span className='error'>{errors.avatar && touched.avatar && errors.avatar}</span>


                        <button type='submit' className="btn-save">
                            {loader ? <div className="loader-btn"></div> : "UPDATE"}
                        </button>
                    </form>
                )}
            </Formik>
        </section>
    );

}


export default Update;