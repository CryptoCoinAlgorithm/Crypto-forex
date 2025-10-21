import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrencyCard from './components/CurrencyCard';
import LicenseManager from './components/LicenseManager';
import { currencyPairs } from './data/currencyPairs';
import './styles/App.css';
import './styles/responsive.css';

const App = () => {
  const [filteredPairs, setFilteredPairs] = useState(currencyPairs);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('adapted');
  const [licenseData, setLicenseData] = useState({ key: '', activationDate: '' });

  // Filter currency pairs based on search term and active tab
  useEffect(() => {
    let filtered = currencyPairs;
    
    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(pair => pair.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pair =>
        pair.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPairs(filtered);
  }, [searchTerm, activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle search input change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Handle license update
  const handleLicenseUpdate = (licenseInfo) => {
    setLicenseData(licenseInfo);
  };

  return (
    <div className="app">
      <Header licenseData={licenseData} />
      
      {/* Main Navigation Tabs */}
      <nav className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'adapted' ? 'active' : ''}`}
          onClick={() => handleTabChange('adapted')}
        >
          Adapted
        </button>
        <button 
          className={`tab-button ${activeTab === 'stopped' ? 'active' : ''}`}
          onClick={() => handleTabChange('stopped')}
        >
          Stopped
        </button>
        <button 
          className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
          onClick={() => handleTabChange('featured')}
        >
          Featured
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <SearchBar onSearchChange={handleSearchChange} />
        
        <LicenseManager onLicenseUpdate={handleLicenseUpdate} />

        {/* Currency Pairs Grid */}
        <div className="currency-grid">
          {filteredPairs.map(pair => (
            <CurrencyCard key={pair.id} pair={pair} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPairs.length === 0 && (
          <div className="empty-state">
            <p>No currency pairs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
