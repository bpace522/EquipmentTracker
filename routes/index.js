const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub Callback endpoint
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect to API Docs upon successful login
    res.redirect('/api-docs');
  }
);

// Logout Route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/api-docs');
  });
});

// Check Current Login Status
router.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;