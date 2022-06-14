import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login, Register } from "./Routes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
