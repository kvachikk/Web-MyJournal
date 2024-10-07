import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar.tsx";
import ".././style.css";

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("asc")) navigate("/login");
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div className="layout">
                <Outlet />
            </div>
        </div>
    );
};