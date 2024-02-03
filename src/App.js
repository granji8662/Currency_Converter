import React, { useState, useEffect } from 'react';//useEffect TO CALL THE APIS ,useState ITS USED TO STORE MULTIPLE VALUES 
import CurrencyConverter from './components/CurrencyConverter';
import axios from 'axios';
import {format} from "date-fns"
import './App.css'; // or the correct path to your CSS file

// Object.keys we can get array values of all

function App() {
  const [price_One, setPriceOne] = useState(1);
  const [price_Two, setPriceTwo] = useState(1);
  const [currency_One, setCurrencyOne] = useState("USD");
  const [currency_Two, setCurrencyTwo] = useState("INR");
  const [currencyPrice, setCurrencyPrice] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
      params: {
        from: 'USD',
        to: 'EUR,GBP'
      },
      headers: {
        'X-RapidAPI-Key': '25f7097945msh4bc96de6b7db6d4p1ffcecjsn2c22a368c65e',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
      }
    };

    try {
      const fetchData = async () => {
        const response = await axios.request(options);
        console.log(response.data);
        setCurrencyPrice(response.data.rates); // Assuming that the response data is an object
      };

      fetchData();
    } catch (error) {
      console.error(error);
      setCurrencyPrice(null);
    }
  }, []);

  const handleAmtOneChange = (price_One) => {
    setPriceTwo(
      (price_One * currencyPrice[currency_Two]) / currencyPrice[currency_One]
    );
    setPriceOne(price_One);
  };

  useEffect(() => {
    !!currencyPrice && handleAmtOneChange(1);
  }, [currencyPrice]);

  const handleAmtTwoChange = (price_Two) => {
    setPriceOne(
      (price_Two * currencyPrice[currency_One]) / currencyPrice[currency_Two]
    );
    setPriceTwo(price_Two);
  };

  const handleCurrencyOneChange = (currency_One) => {
    setPriceTwo(
      price_One * currencyPrice[currency_Two] / currencyPrice[currency_One]
    );
    setCurrencyOne(currency_One);
  };

  const handleCurrencyTwoChange = (currency_Two) => {
    setPriceOne(
      price_Two * currencyPrice[currency_One] / currencyPrice[currency_Two]
    );
    setCurrencyTwo(currency_Two);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">
  <i><span style={{ textDecoration: 'line-through' }}>Currency Converter</span></i>
  
</h2>
<p className="conversion-info">
  <span className="small-text">1 {currency_One} equals = </span>
  <span className="big-text">
    {(price_Two / price_One).toFixed(2)} {currency_Two}
  </span>
</p>


      <b className="date-time">{format(new Date(), "dd/MM/yyyy h:mm:ss")}</b>

      <CurrencyConverter
        prize={price_One}
        currency={currency_One}
        currencyList={Object.keys(currencyPrice)}
        onAmountChanges={handleAmtOneChange}
        onCurrencyChanges={handleCurrencyOneChange}
        containerClassName="converter-container"
        inputClassName="converter-input"
        selectClassName="converter-select"
      />

      <CurrencyConverter
        prize={price_Two}
        currency={currency_Two}
        currencyList={Object.keys(currencyPrice)}
        onAmountChanges={handleAmtTwoChange}
        onCurrencyChanges={handleCurrencyTwoChange}
        containerClassName="converter-container"
        inputClassName="converter-input"
        selectClassName="converter-select"
      />
    </div>
  );
  
}
export default App;
