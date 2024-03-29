import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
// import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import socket from "./API/sockets";
import { useAppDispatch, useAppSelector } from "./Hooks/hooks";
import useInvalidateQuery from "./Hooks/useInvalidateQuery";
import { updateUserRoles } from "./Redux/Slices/userSlice";
import { setModal } from "./Redux/Slices/modalSlice";
import Spinner from "./Components/Spinner";
import { deleteComment } from "./Redux/Slices/commentsSlice";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackWithoutRetry from "./Components/ErrorFallback/ErrorFallbackWithoutRetry";
import useScreenSize from "./Hooks/useScreenSize";

const Navbar = lazy(() => import("./Components/Navbar"));
const MobileNavBar = lazy(() => import("./Components/Navbar/MobileNavBar"));
const Login = lazy(() => import("./Routes/Login/login"));
const Register = lazy(() => import("./Routes/Register/register"));
const Dashboard = lazy(() => import("./Routes/Dashboard/dashboard"));
const RegistrationSuccessful = lazy(
    () => import("./Routes/Register-Successful/registration-successful")
);
const PageNotFound = lazy(() => import("./Routes/PageNotFound/pageNotFound"));
const Unauthorized = lazy(() => import("./Routes/Unauthorized/unauthorized"));
const AddGroup = lazy(() => import("./Routes/AddGroup/addGroup"));
const Tickets = lazy(() => import("./Routes/Tickets/tickets"));
const Project = lazy(() => import("./Routes/Project/project"));
const Administration = lazy(
    () => import("./Routes/Administration/administration")
);
const Modal = lazy(() => import("./Components/Modal"));

const PersistLogin = lazy(
    () => import("./Components/PersistLogin/persistLogin")
);
const RequireAuth = lazy(() => import("./Components/RequireAuth/RequireAuth"));

const ToastContainer = lazy(async () => {
    const { ToastContainer } = await import("react-toastify");
    return { default: ToastContainer };
});

const NavbarLayout = () => {
    const { screenWidth } = useScreenSize();
    return (
        <>
            {screenWidth > 766 ? (
                <Navbar></Navbar>
            ) : (
                <MobileNavBar></MobileNavBar>
            )}
            <Outlet></Outlet>
        </>
    );
};

function App() {
    const { invalidateQuery } = useInvalidateQuery();
    const auth = useAppSelector((state) => state.auth);
    const persist = useAppSelector((state) => state.persist.persist);
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
    }, [auth?.group_id, auth.username, dispatch]);

    useEffect(() => {
        socket.on("invalidateData", (query) => {
            invalidateQuery({ queryName: query });
        });

        socket.on("deleteComment", (data) => {
            dispatch(deleteComment(data.comment));
        });

        socket.on("invalidateCommentPage", (data) => {
            invalidateQuery({ queryName: data.queryName, page: data.page });
        });

        return () => {
            socket.off("invalidateData");
            socket.off("deleteComment");
        };
    }, [invalidateQuery, dispatch]);

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            socket.emit("leavingPage");
        });

        return () => {
            window.removeEventListener("beforeunload", () => null);
        };
    });

    return (
        <>
            <ErrorBoundary
                fallback={
                    <ErrorFallbackWithoutRetry text='Error: Could not load the page'></ErrorFallbackWithoutRetry>
                }
            >
                <Suspense
                    fallback={
                        <div className='fixed inset-0 flex justify-center items-center'>
                            <div className='bg-black w-20 h-20 rounded-lg flex justify-center items-center'>
                                <Spinner></Spinner>
                            </div>
                        </div>
                    }
                >
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
                                persist ? (
                                    <Navigate replace to='dashboard'></Navigate>
                                ) : (
                                    <Navigate replace to='login'></Navigate>
                                )
                            }
                        ></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                        <Route
                            path='/register'
                            element={<Register></Register>}
                        ></Route>
                        <Route
                            path='/registration-successful'
                            element={
                                <RegistrationSuccessful></RegistrationSuccessful>
                            }
                        ></Route>
                        {/* PROTECT ROUTES */}
                        <Route element={<PersistLogin></PersistLogin>}>
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={["2001"]}
                                    ></RequireAuth>
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
                            </Route>
                            <Route
                                element={
                                    <RequireAuth
                                        allowedRoles={["1990"]}
                                    ></RequireAuth>
                                }
                            >
                                <Route element={<NavbarLayout></NavbarLayout>}>
                                    <Route
                                        path='/admin'
                                        element={
                                            <Administration></Administration>
                                        }
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
                        <Route
                            path='*'
                            element={<PageNotFound></PageNotFound>}
                        ></Route>
                    </Routes>
                </Suspense>
            </ErrorBoundary>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </>
    );
}

export default App;
