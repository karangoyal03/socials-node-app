require('dotenv').config();
const app = require('./App');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;
console.log('Starting server...');
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
