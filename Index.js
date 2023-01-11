
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3100;

const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const spaceRoute = require('./routes/spaceRouters');
const bookingRoute = require('./routes/bookingRouters')


app.use(express.json());


const corsOrigin ={
  origin:'*', //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus:200,
}

this.app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors(corsOrigin));

//app.use(function(req,res){
  //  res.set({
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*',
    //     'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
    // });
//})
//app.use(cors());
//app.use(cors({origin:"*", credentials: true, optionsSuccessStatus: 200}))


app.get('/', (req,res) =>{
 // res.setHeader('Access-Control-Allow-Origin', '*');
//   res.set({
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': '*',
//     'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
// });
    res.send("hello World !");
});

app.use('/user', userRoute);
app.use('/spaces', spaceRoute);
app.use('/booking', bookingRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));