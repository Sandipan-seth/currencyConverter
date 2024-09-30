import { useEffect, useState } from "react";
import React from "react";
import Dropdown from "./Dropdown";

function CurrencyConvertor() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  function amountHandle(amount) {
    if (amount > 0) {
      return "focus:ring-1 focus:ring-green-500";
    } else {
      setAmount(1);
    }
  }

  const host = "https://api.frankfurter.app/currencies";
  const fetchCurrencies = async () => {
    try {
      const res = await fetch(host);
      const data = await res.json();
      // console.log(data);
      setCurrencies(Object.keys(data));
    } catch (err) {
      console.error("Error");
    }
  };
  //   const link = "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";

  const convertCurrency = async () => {
    const link = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
    try {
      const res = await fetch(link);
      const data = await res.json();
      //   console.log(data);
      // console.log(data.rates[toCurrency])
      setConvertedAmount(data.rates[toCurrency]);
    } catch (err) {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Convertor
      </h1>

      <div>
        <div>
          <Dropdown
            currencies={currencies}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            title="From"
          />
          <button
            className="bg-red-600 text-white px-2 py-1 my-2 rounded-md"
            onClick={() => {
              const temp = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(temp);
            }}
          >
            Swap
          </button>
          <Dropdown
            currencies={currencies}
            currency={toCurrency}
            setCurrency={setToCurrency}
            title="To"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount:
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            className={`w-full border border-gray-300 rounded-md p-2 mt-2 shadow-sm focus:outline-none focus:ring-1 
            ${amountHandle(amount)}`}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={convertCurrency}
          >
            Convert
          </button>
        </div>

        <div className={`text-green-500 text-lg font-medium text-right
        ${amount==0?'hidden':''}`}>
          Converted Amount: {convertedAmount} {toCurrency}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConvertor;
