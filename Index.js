// const http = require('http');
// require('dotenv').config();


// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3100;

const cors = require('cors');

const userRoute = require('./routes/userRoutes');
const spaceRoute = require('./routes/spaceRouters');
const bookingRoute = require('./routes/bookingRouters')


app.use(express.json());
app.use(cors());


app.get('/', (req,res) =>{
    res.send("hello World !");
});

app.use('/user', userRoute);
app.use('/spaces', spaceRoute);
app.use('/booking', bookingRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));