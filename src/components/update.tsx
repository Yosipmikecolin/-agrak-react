import { Formik } from 'formik';
import "../styles/update.css";

const Update = () => {

    const submitUser = () => {
        alert("sdd")
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
            {({ }) => (
                <form>
                    <h1>Create user</h1>
                    <input type="text" placeholder="Fist name" />
                    <input type="text" placeholder="Second name" />
                    <input type="email" placeholder="Email" />
                    <input type="file" placeholder="Avatar" />

                    <button className="btn-save">UPDATE</button>
                </form>

            )}
        </Formik>

    );

}


export default Update;