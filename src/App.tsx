import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Login, Register } from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer
                position='top-right'
                draggable={true}
                draggablePercent={75}
                autoClose={5000}
            ></ToastContainer>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route
                        path='/register'
                        element={<Register></Register>}
                    ></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
