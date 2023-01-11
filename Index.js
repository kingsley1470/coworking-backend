
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3100;

const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const spaceRoute = require('./routes/spaceRouters');
const bookingRoute = require('./routes/bookingRouters')


app.use(express.json());
//app.use(cors());
app.use(cors({origin:"*", optionsSuccessStatus: 200}))


app.get('/', (req,res) =>{
    res.send("hello World !");
});

app.use('/user', userRoute);
app.use('/spaces', spaceRoute);
app.use('/booking', bookingRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));