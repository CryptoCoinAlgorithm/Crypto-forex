// License validation and utility functions

export const validateLicenseKey = (key) => {
  // Basic license key validation
  // You can implement more complex validation logic here
  const licensePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return licensePattern.test(key) || key.length >= 8;
};

export const saveLicenseToStorage = (licenseData) => {
  try {
    localStorage.setItem('ferix_license', JSON.stringify(licenseData));
    return true;
  } catch (error) {
    console.error('Error saving license:', error);
    return false;
  }
};

export const loadLicenseFromStorage = () => {
  try {
    const savedLicense = localStorage.getItem('ferix_license');
    return savedLicense ? JSON.parse(savedLicense) : null;
  } catch (error) {
    console.error('Error loading license:', error);
    return null;
  }
};

export const isLicenseValid = () => {
  const licenseData = loadLicenseFromStorage();
  if (!licenseData) return false;
  
  // Check if license is expired (1 year validity)
  const activationDate = new Date(licenseData.activationDate);
  const oneYearFromActivation = new Date(activationDate);
  oneYearFromActivation.setFullYear(oneYearFromActivation.getFullYear() + 1);
  
  return new Date() <= oneYearFromActivation;
};
