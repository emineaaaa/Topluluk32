const express = require('express');
const connectToMongoDB = require('./connectToMongoDB');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config();


const app = express();
app.use(express.json()); //middleware dakileri (json) okuyabilmemiz için 
app.use(cookieParser());

const etkinlikRoute = require('./routes/etkinlik.js');
const toplulukRoute = require('./routes/topluluk.js');
const yoneticiRoute = require('./routes/yonetici.js');
const adminRoute=require('./routes/admin.js');
const protectRouteAdmin = require('./middleware/protectRouteAdmin');
const protectRoute = require('./middleware/protectRoute');


app.use('/etkinlik',etkinlikRoute);
app.use('/topluluk', toplulukRoute);
app.use('/yonetici',protectRoute, yoneticiRoute);
app.use('/admin',protectRouteAdmin, adminRoute)


console.log(process.env.PORT);
const port = process.env.PORT || 3000;
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Running on Port ${port}`);
        console.log(`Open http://localhost:${port} in your browser`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});