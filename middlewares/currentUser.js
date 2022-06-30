module.exports = {
    currentUser: function (req, res, next) {
        res.locals.currentUser = req.user;
        next();
      }
}

