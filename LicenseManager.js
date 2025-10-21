import React, { useState, useEffect } from 'react';
import { validateLicenseKey, saveLicenseToStorage, loadLicenseFromStorage } from '../utils/licenseUtils';

const LicenseManager = ({ onLicenseUpdate }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    // Load license data on component mount
    const savedLicense = loadLicenseFromStorage();
    if (savedLicense) {
      setLicenseKey(savedLicense.key);
      setIsActivated(true);
      onLicenseUpdate(savedLicense);
    }
  }, [onLicenseUpdate]);

  const handleActivateLicense = () => {
    if (licenseKey.trim()) {
      const isValid = validateLicenseKey(licenseKey);
      if (isValid) {
        const licenseData = {
          key: licenseKey,
          activationDate: new Date().toLocaleDateString('en-GB')
        };
        
        saveLicenseToStorage(licenseData);
        setIsActivated(true);
        onLicenseUpdate(licenseData);
        alert('✅ License activated successfully!');
      } else {
        alert('❌ Invalid license key format. Please check your key.');
      }
    } else {
      alert('⚠️ Please enter a valid license key');
    }
  };

  const handleDeactivateLicense = () => {
    localStorage.removeItem('ferix_license');
    setLicenseKey('');
    setIsActivated(false);
    onLicenseUpdate({ key: '', activationDate: '' });
    alert('License deactivated successfully!');
  };

  return (
    <div className="license-activation-section">
      <div className="license-input-group">
        <input
          type="text"
          className="license-input"
          placeholder="Enter license key"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          disabled={isActivated}
        />
        
        {!isActivated ? (
          <button className="activate-button" onClick={handleActivateLicense}>
            Activate License
          </button>
        ) : (
          <button className="deactivate-button" onClick={handleDeactivateLicense}>
            Deactivate License
          </button>
        )}
      </div>
      
      {isActivated && (
        <div className="license-success">
          <span>✅ License is active and valid</span>
        </div>
      )}
    </div>
  );
};

export default LicenseManager;
