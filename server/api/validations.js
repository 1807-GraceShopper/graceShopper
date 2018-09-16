const requireLogin = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(401).send('User must be logged in to access this feature.')
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json('User must be admin to access this feature.')
  }
}

module.exports = {requireLogin, requireAdmin}
