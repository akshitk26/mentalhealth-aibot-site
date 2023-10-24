import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div id="header">
      <h1>TranqTalk</h1>
      <nav>
        <ul>
          <li><Link to="/">Chat</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;