const express = require("express");

const cors = require('cors');

const sequelize =  require('./config/database');

const meetingRoutes = require('./routes/meeting');


const app = express();

// using cors middleware to handle cross-origin requests

app.use(cors());


// syncing sequelize models with the database

 (async ()=> {
    try {
        await sequelize.sync();
        console.log("Database synced successfully");
    } catch(error) {
        console.log("Error syncing database")
    }
 })();

// Body parser middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// using routes 

app.use('/api',meetingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on http:localhost${PORT}`)
});