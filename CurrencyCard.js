import React from 'react';
import '../styles/CurrencyCard.css';

const CurrencyCard = ({ pair }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'adapted': return '#4CAF50';
      case 'stopped': return '#F44336';
      case 'featured': return '#FF9800';
      default: return '#2196F3';
    }
  };

  const getProfitColor = (profit) => {
    return profit.includes('+') ? '#4CAF50' : '#F44336';
  };

  return (
    <div className="currency-card">
      <div className="card-header">
        <h3 className="pair-name">{pair.name}</h3>
        <span className="pair-type">({pair.type})</span>
      </div>
      
      <div className="card-body">
        <div className="market-info">
          <div className="info-item">
            <span className="info-label">Market</span>
            <span className="info-value">{pair.currentPrice}</span>
            <span className={`change ${pair.change.includes('+') ? 'positive' : 'negative'}`}>
              {pair.change}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Profit</span>
            <span 
              className="profit-value" 
              style={{ color: getProfitColor(pair.profit) }}
            >
              {pair.profit}
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(pair.status) }}
        >
          {pair.status.charAt(0).toUpperCase() + pair.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default CurrencyCard;
