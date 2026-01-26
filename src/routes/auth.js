const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });

  res.redirect('/login');
});
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
);
