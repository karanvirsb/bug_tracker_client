import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>Group name</h1>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/tickets'>Tickets</Link>
            </div>
            <button>Logout</button>
        </nav>
    );
};

export const AdminNavbar = () => {
    return (
        <nav>
            <div>
                <h1>Group name</h1>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/tickets'>Tickets</Link>
            </div>
            <button>Logout</button>
        </nav>
    );
};
