import React from "react";

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
            </form>
        </section>
    );
};

export default Register;
