
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3100;

const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const spaceRoute = require('./routes/spaceRouters');
const bookingRoute = require('./routes/bookingRouters')


app.use(express.json());


// const corsOrigin ={
//   origin:'*', //or whatever port your frontend is using
//   credentials: true,
//   optionSuccessStatus:200,
// }

// const corsConfig = {
//   origin: ["http://localhost:3000"],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ['Content-Type']
// };

// app.use(cors());

// app.use(function(req,res,next){
//   res.set({
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': '*',
//         'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
//     });
//      res.setHeader('Access-Control-Allow-Origin', '*');
// })



app.use(cors({origin:"*", credentials: true, optionsSuccessStatus: 200}))


app.get('/', (req,res) =>{
    res.send("hello World !");
});

app.use('/user', userRoute);
app.use('/spaces', spaceRoute);
app.use('/booking', bookingRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));