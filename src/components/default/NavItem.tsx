import * as React from "react";
import { Link } from "react-router-dom";
import { INavItemProps } from "../../interfaces/INavItemProps.ts";
import ".././style.css";

const NavItem: React.FC<INavItemProps> = ({ title, endpoint, icon, isSelected, onClick }) => {
    return (
        <Link className={`nav-item ${isSelected ? 'selected' : ''}`} to={endpoint} style={{ textDecoration: "none" }} onClick={onClick}>
            <div>
                {icon}<span>{title}</span>
            </div>
        </Link>
    );
};

export default NavItem;