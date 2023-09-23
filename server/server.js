const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3001; // Choose your desired port

app.use(bodyParser.json());

// Enable CORS to allow requests from your React front-end (replace with your front-end's actual domain)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your React app's URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define the generatePickingList and generatePackingList functions here
function generatePickingList(ordersData) {
  const pickingList = {};

  ordersData.forEach((order) => {
    order.line_items.forEach((lineItem) => {
      const productId = lineItem.product_id;
      const quantity = lineItem.quantity;

      if (productId in pickingList) {
        pickingList[productId] += quantity;
      } else {
        pickingList[productId] = quantity;
      }
    });
  });

  return pickingList;
}

function generatePackingList(ordersData, productsData) {
  const packingList = [];

  ordersData.forEach((order) => {
    const orderInfo = {
      'Order #': order.order_id,
      'Order Date': order.order_date,
      'Line Items': [],
    };

    order.line_items.forEach((lineItem) => {
      const productId = lineItem.product_id;
      const productName = productsData[productId].name; // Get product name from productsData
      const quantity = lineItem.quantity;

      const lineItemInfo = {
        'Product Name': productName,
        'Quantity': quantity,
      };

      orderInfo['Line Items'].push(lineItemInfo);
    });

    packingList.push(orderInfo);
  });

  return packingList;
}

// New route to receive data from the client at '/generate-lists'
app.post('/generate-lists', async (req, res) => {
  try {
    // Receive ordersData and productsData in the request body
    const { ordersData, productsData } = req.body;

    // Implement the list generation logic here (using generatePickingList and generatePackingList functions)
    const pickingList = generatePickingList(ordersData);
    const packingList = generatePackingList(ordersData, productsData);

    // Respond with the generated lists
    res.json({ pickingList, packingList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
