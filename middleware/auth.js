// middleware is a function that access to the req & res cycle and req & res object
// every time we hit an endpoint we can fire off this middleware and check to see if there is a token in the header

const jwt = require('jsonwebtoken')
const config = require('config')

// all middleware functions take in req, res and next arguments - after you do what you want to do you call next argument to move on to next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
