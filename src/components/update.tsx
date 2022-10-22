import { Formik } from 'formik';
import { Form } from '../interfaces/form.interface';
import { updateUser } from "../config/axios"
import "../styles/update.css";

const Update = () => {

    const submitUser = (values: Form) => {

        updateUser(values).then((response) => {
            console.log(response)

        })
    }



    return (
        <Formik
            initialValues={{ first_name: '', second_name: '', email: '', avatar: '' }}
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
                    <h1>Create user</h1>
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
                        type="file"
                        placeholder="Avatar"
                        name='avatar'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.avatar}
                    />
                    <span className='error'>{errors.avatar && touched.avatar && errors.avatar}</span>


                    <button type='submit' className="btn-save">UPDATE</button>
                </form>
            )}
        </Formik>

    );

}


export default Update;