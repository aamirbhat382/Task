require('dotenv').config()
const express = require('express');
const app = express()
const connection = require('./database')
const PORT = 5500 || process.env.PORT



// All Routes 
const userRoutes = require('./routes/auth');



app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Register the Routes imported above
app.use('/api', userRoutes)


app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT} ... `);
});


