import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <nav className="bg-black w-full h-110 p-4 flex items-center justify-center">
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-yellow-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-yellow-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white hover:text-yellow-400">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-yellow-400">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
