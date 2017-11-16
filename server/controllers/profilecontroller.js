const User = require('../models/user')

exports.editUser = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    // if (!email || !password) {
    //   return res.status(422).send({ error: 'You must provide email and password'});
    // };
  
    // See if a user with the given email exists
    User.findOne({ email: email }, function (err, existingUser) {
      if (err) { return next(err) }
  
      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' })
      }
  
      // If a user with email does NOT exist, create and save user record
      const user = new User({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      });
  
      user.save(function (err) {
        if (err) { return next(err) }
  
        // Repond to request indicating the user was created
        res.json({ token: tokenForUser(user) })
      });
    });
  };