import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section>
            <form action=''>
                <div>
                    <input type='text' name='firstName' id='' />
                    <input type='text' name='lastName' />
                </div>
                <input type='email' name='email' />
                <input type='text' name='username' />
                <input type='password' name='password' />
                <input type='password' name='confirmPassword' />
                <div>
                    <button>Register</button>
                    <Link to='/login'>Aleady have an account?</Link>
                </div>
            </form>
        </section>
    );
};

export default Register;
