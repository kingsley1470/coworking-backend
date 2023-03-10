
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3100;

const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const spaceRoute = require('./routes/spaceRouters');
const bookingRoute = require('./routes/bookingRouters');
const sendMailRoute = require('./routes/sendMailRouter');
const contactRoute = require('./routes/contactRoute');


app.use(express.json());


app.use(cors({origin:"*", credentials: true, optionsSuccessStatus: 200}))


app.get('/', (req,res) =>{
    res.send("hello World !");
});

app.use('/user', userRoute);
app.use('/spaces', spaceRoute);
app.use('/booking', bookingRoute);
app.use('/send-email', sendMailRoute);
app.use('/contact-us',contactRoute);



app.listen(port, () => console.log(`Server running on port ${port}`));