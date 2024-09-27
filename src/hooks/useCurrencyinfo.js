import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
      const data = await response.json();
      setData(data.rates);
    };

    fetchData();
    console.log(data);
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
