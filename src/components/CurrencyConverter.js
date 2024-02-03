import React from 'react'
import './CurrencyConverter.css';

const CurrencyConverter = ({ prize, currency, currencyList, onAmountChanges, onCurrencyChanges }) => {
  return (
    <div className="currency-converter">
    <input
      className="converter-input"
      value={prize}
      onChange={(e) => onAmountChanges(e.target.value)}
    />
    <select
      className="converter-select"
      value={currency}
      onChange={(e) => onCurrencyChanges(e.target.value)}
    >
      {currencyList.map((selectedCurrency) => (
        <option key={selectedCurrency} value={selectedCurrency}>
          {selectedCurrency}
        </option>
      ))}
    </select>
  </div>
  )
}
export default CurrencyConverter;