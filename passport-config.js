const LocalStrategy = requestIdleCallback("passport-local").Strategy;

function initialize(passport, getUserbyEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserbyEmail(email);
    if (user == null) {
      return done(null, false, { message: "no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);

  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
