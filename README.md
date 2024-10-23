# expense

This is the backend for a Daily Expenses Sharing Application. The application allows users to add expenses and split them based on three different methods: exact amounts, percentages, and equal splits. The backend is built using Node.js and Express with MongoDB as the database.

# Features
1. User Management: Create and retrieve user details.
2. Expense Management: Add and retrieve expenses for users.
3. Expense Split Methods:
Equal: Split expenses equally among participants.
Exact: Specify the exact amount each participant owes.
Percentage: Specify percentages to split expenses (ensures the total equals 100%).
4. Balance Sheet: Show individual and overall expenses for all users.
5. Download Balance Sheet: Option to download the balance sheet as a file.

# Requirements
1. Node.js (version 12 or higher)
2. MongoDB (either local or MongoDB Atlas)

#   Getting Started
1. Clone the repository

   git clone https://github.com/yourusername/daily-expenses-sharing-backend.git
   cd daily-expenses-sharing-backend

2. Install dependencies
   npm install

3. Set up environment variables
   Create a .env file in the root directory and add your MongoDB URI:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense?retryWrites=true&w=majority
   PORT=3000

4. Start the server
   npm start



   


