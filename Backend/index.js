require('dotenv').config();
const express = require('express');
const server = express(); // express server
const cors = require('cors');
//routes
const ServiceRouter = require('./Routes/Routes.Services');
server.use(cors({origin:"*"})); 
server.use('/api',ServiceRouter);

server.listen(process.env.PORT,()=>{
    try {
     console.log(`server is running on ${process.env.PORT}`);
    
    }catch (error) {
        console.log(error);      
    }
})
