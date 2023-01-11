const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
//console.log("toke in back-end  ", token)
  if (!token) return res.status(400).send('No token sent');
 
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });


  // const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  // if (!_id) return res.status(403).send('Invalid token');
  // req.userId = _id;
  // next();
};

module.exports = { verifyToken };