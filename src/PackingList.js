import React from 'react';

function PackingList({ packingList }) {
  return (
    <div>
      <h2>Packing List</h2>
      {packingList.map((orderInfo) => (
        <div key={orderInfo['Order #']}>
          <h3>Order #{orderInfo['Order #']}</h3>
          <p>Order Date: {orderInfo['Order Date']}</p>
          <ul>
            {orderInfo['Line Items'].map((lineItem, index) => (
              <li key={index}>
                Product Name: {lineItem['Product Name']}, Quantity: {lineItem['Quantity']}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PackingList;
