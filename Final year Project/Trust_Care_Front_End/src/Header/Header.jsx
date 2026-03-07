import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

function Header() {
  return (
    <header className = 'header' style = {{ backgroundColor: 'blue' }}>
      <div className = 'header-container'>
        <img src = {logo} alt = 'Logo' className = 'logo' />
        <div>
          <h1 className = 'heading'>Trust Care System – Health Care1</h1>
          <p className = 'sentences'>Connecting Hearts with Helping Hands</p>
        </div>
      </div>
    </header>
  );
}

export default Header;