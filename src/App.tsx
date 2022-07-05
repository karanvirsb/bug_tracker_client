import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
    Dashboard,
    Login,
    Register,
    RegistrationSuccessful,
    PageNotFound,
    Unauthorized,
    AddGroup,
} from "./Routes";
import { ToastContainer } from "react-toastify";
import PersistLogin from "./Components/PersistLogin/persistLogin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import socket from "./API/sockets";
import { Navbar } from "./Components/Navbar";

const NavbarLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

function App() {
    useEffect(() => {
        socket.on("connect", () => {});
    }, []);

    return (
        <Router>
            <ToastContainer
                position='top-right'
                draggable={true}
                draggablePercent={75}
                autoClose={5000}
            ></ToastContainer>
            <Routes>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
                <Route
                    path='/registration-successful'
                    element={<RegistrationSuccessful></RegistrationSuccessful>}
                ></Route>
                <Route
                    path='/add-group'
                    element={<AddGroup></AddGroup>}
                ></Route>
                {/* PROTECT ROUTES */}
                <Route element={<PersistLogin></PersistLogin>}>
                    <Route
                        element={
                            <RequireAuth allowedRoles={["2001"]}></RequireAuth>
                        }
                    >
                        <Route element={<NavbarLayout></NavbarLayout>}>
                            <Route
                                path='/'
                                element={<Dashboard></Dashboard>}
                            ></Route>
                        </Route>
                        {/* TODO add routes */}
                    </Route>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[1990]}></RequireAuth>
                        }
                    >
                        {/* TODO add routes */}
                        <Route path='/admin'></Route>
                    </Route>
                </Route>
                {/* Unauthorized */}
                <Route
                    path='/unauthorized'
                    element={<Unauthorized></Unauthorized>}
                ></Route>
                {/* This is for 404 not found */}
                <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
