import React, { useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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
    Tickets,
} from "./Routes";
import { ToastContainer } from "react-toastify";
import PersistLogin from "./Components/PersistLogin/persistLogin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import socket from "./API/sockets";
import { Navbar } from "./Components/Navbar";
import { useAppDispatch, useAppSelector } from "./Hooks/hooks";
import useInvalidateQuery from "./Hooks/useInvalidateQuery";
import Project from "./Routes/Project/project";
import Modal from "./Components/Modal";
import Administration from "./Routes/Administration/administration";
import { updateUserRoles } from "./Redux/Slices/userSlice";
import { setModal } from "./Redux/Slices/modalSlice";

const NavbarLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

function App() {
    const { invalidateQuery } = useInvalidateQuery();
    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected: " + socket.connected);
        });

        socket.on("disconnect", () => {
            console.log("disconnected: " + socket.connected);
        });

        socket.emit("joinRoom", {
            roomId: auth?.group_id,
            username: auth.username,
        });

        socket.on("roomJoined", (join) => {
            console.log("room join: " + join);
        });

        socket.on("updateRoles", (roles) => {
            console.log("new roles", roles);
            dispatch(updateUserRoles(roles));
        });

        socket.on("removedFromGroup", () => {
            // do modal
            dispatch(
                setModal({ type: "removedUserModal", open: true, options: {} })
            );
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("roomJoined");
            socket.emit("leavingPage");
            socket.disconnect();
            socket.connect();
        };
    }, []);

    useEffect(() => {
        socket.on("invalidateData", (query) => {
            invalidateQuery({ queryName: query });
        });

        return () => {
            socket.off("invalidateData");
        };
    }, [socket, invalidateQuery]);

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            socket.emit("leavingPage");
        });

        return () => {
            window.removeEventListener("beforeunload", () => {});
        };
    });

    return (
        <>
            <ToastContainer
                position='top-right'
                draggable={true}
                draggablePercent={75}
                autoClose={5000}
            ></ToastContainer>
            <Modal></Modal>
            <Routes>
                <Route
                    path='/'
                    element={
                        !auth.group_id ? (
                            <Navigate replace to='login'></Navigate>
                        ) : (
                            <Navigate replace to='dashboard'></Navigate>
                        )
                    }
                ></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
                <Route
                    path='/registration-successful'
                    element={<RegistrationSuccessful></RegistrationSuccessful>}
                ></Route>
                {/* PROTECT ROUTES */}
                <Route element={<PersistLogin></PersistLogin>}>
                    <Route
                        element={
                            <RequireAuth allowedRoles={["2001"]}></RequireAuth>
                        }
                    >
                        <Route
                            path='/add-group'
                            element={<AddGroup></AddGroup>}
                        ></Route>
                        <Route element={<NavbarLayout></NavbarLayout>}>
                            <Route
                                path='/dashboard'
                                element={<Dashboard></Dashboard>}
                            ></Route>
                            <Route
                                path='/project/:projectId'
                                element={<Project></Project>}
                            ></Route>
                            <Route
                                path='/tickets'
                                element={<Tickets></Tickets>}
                            ></Route>
                        </Route>
                        {/* TODO add routes */}
                    </Route>
                    <Route
                        element={
                            <RequireAuth allowedRoles={["1990"]}></RequireAuth>
                        }
                    >
                        <Route element={<NavbarLayout></NavbarLayout>}>
                            <Route
                                path='/admin'
                                element={<Administration></Administration>}
                            ></Route>
                        </Route>
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
