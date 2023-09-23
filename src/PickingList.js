import React from 'react';

function PickingList({ pickingList }) {
  return (
    <div>
      <h2>Picking List</h2>
      <ul>
        {Object.entries(pickingList).map(([productId, quantity]) => (
          <li key={productId}>
            Product ID: {productId}, Quantity: {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PickingList;
