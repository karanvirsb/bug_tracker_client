import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useNavigate,
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
import { useAppSelector } from "./Hooks/hooks";
import { AnimatePresence } from "framer-motion";
import Backdrop from "./Components/Backdrop";

const NavbarLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

function App() {
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth);
    const modal = useAppSelector((state) => state.modal);

    useEffect(() => {
        socket.on("connect", () => {});
    }, []);

    useEffect(() => {
        if (!auth.accessToken) {
            navigate("/login", { replace: true });
        }
    }, [auth.accessToken, navigate]);

    return (
        <>
            <ToastContainer
                position='top-right'
                draggable={true}
                draggablePercent={75}
                autoClose={5000}
            ></ToastContainer>
            {/* TODO add modals to backdrop */}
            <AnimatePresence exitBeforeEnter={true} initial={false}>
                {modal.open && <Backdrop></Backdrop>}
            </AnimatePresence>
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
                                path='/dashboard'
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
        </>
    );
}

export default App;
