import React from 'react';

const Header = ({ licenseData }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Ferix Software ORG</h1>
        <div className="license-section">
          <div className="license-info">
            <span className="license-status">LICENSE KEY ACTIVATED</span>
            <span className="activation-date">
              {licenseData.activationDate || '19-10-2025'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
