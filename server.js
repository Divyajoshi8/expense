require('dotenv').config();  // Add this at the top of server.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(bodyParser.json());

// Use the MongoDB URI from the environment variables
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// MongoDB connection function
async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("expense").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
}

connectToMongoDB();

// Routes
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
