import React, { useState } from "react";
import { data } from "../datas";

const Main = () => {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(parseInt(e.target.value) || 0);
  };

  const getTotalForMonth = (monthName) => {
    let total = 0;
    data.forEach((store) => {
      const month = store.months.find((month) => month.name === monthName);
      if (month) {
        total += month.value;
      }
    });
    return total;
  };

  const getTotalForStore = (storeId) => {
    let total = 0;
    const store = data.find((store) => store.store.id === storeId);
    store.months.forEach((month) => (total += month.value));
    return total;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Store:</th>
          {data[0].months.map((month) => (
            <th key={month.id}>{month.name}</th>
          ))}
          <th>Total:</th>
        </tr>
      </thead>

      <tbody>
        {data.map((store) => (
          <tr key={store.store.id}>
            <td>{store.store.name}</td>
            {store.months.map((month) => (
              <td key={month.id}>
                <input
                  type="number"
                  defaultValue={month.value}
                  onChange={(e) => {
                    month.value = parseInt(e.target.value) || 0;
                    setInputValue(inputValue + month.value); // to re-render table
                  }}
                />
              </td>
            ))}
            <td>{getTotalForStore(store.store.id)}</td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>Total</td>
          {data[0].months.map((month) => (
            <td key={month.id}>{getTotalForMonth(month.name)}</td>
          ))}
          <td>
            {data.reduce(
              (total, store) => total + getTotalForStore(store.store.id),
              0
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Main;
