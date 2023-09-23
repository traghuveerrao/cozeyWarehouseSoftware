import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import PickingList from './PickingList';
import PackingList from './PackingList';

function App() {
  const [pickingList, setPickingList] = useState({}); // State for picking list data
  const [packingList, setPackingList] = useState([]); // State for packing list data
  const [listsGenerated, setListsGenerated] = useState(false); // State to track list generation status

  // Function to generate lists on the server
  const generateListsOnServer = async () => {
    try {
      // Fetch ordersData and productsData as before (assuming they are in public/fixtures)
      const ordersResponse = await axios.get('/fixtures/orders.json');
      const productsResponse = await axios.get('/fixtures/products.json');

      const ordersData = ordersResponse.data;
      const productsData = productsResponse.data;

      // Send ordersData and productsData to the server at '/generate-lists'
      const response = await axios.post('/generate-lists', {
        ordersData,
        productsData,
      });

      // Retrieve the picking and packing lists from the server response
      const { pickingList, packingList } = response.data;

      // Update the state with the received data
      setPickingList(pickingList);
      setPackingList(packingList);

      // Set listsGenerated to true to indicate that lists are generated
      setListsGenerated(true);
    } catch (error) {
      console.error(error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      <h1>Warehouse Management</h1>
      <button onClick={generateListsOnServer}>Generate Lists</button>
      {listsGenerated && (
        <div>
          {/* Render the PickingList and PackingList components */}
          <h2>Picking List</h2>
          <PickingList pickingList={pickingList} />

          <h2>Packing List</h2>
          <PackingList packingList={packingList} />
        </div>
      )}
    </div>
  );
}

export default App;
