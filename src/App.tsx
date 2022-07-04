import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
    Home,
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
import useAuth from "./Hooks/useAuth";
import { IStates } from "./Context/AuthProvider";

function App() {
    const { auth }: IStates = useAuth();
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);

            socket.emit("joinRoom", {
                query: {
                    room: auth?.group_id,
                },
            });
        });
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
                        {/* TODO add routes */}
                        <Route path='/' element={<Home></Home>}></Route>
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
