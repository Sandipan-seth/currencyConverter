import React from "react";

function Dropdown({ currencies, currency, setCurrency, title = "" }) {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}:
      </label>

      <div className="mt-1 relative">
        <select
          name=""
          id=""
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((cr) => {
            return (
              <option value={cr} key={cr}>
                {cr}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
