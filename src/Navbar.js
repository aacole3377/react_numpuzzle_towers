import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/number-puzzle" activeClassName="active-link">
                        Number Puzzle
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/towers-of-hanoi" activeClassName="active-link">
                        Towers of Hanoi
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
