function ensureAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

function ensureRole(role) {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).send('Доступ заборонений');
    }
    next();
  };
}

module.exports = {
  ensureAuth,
  ensureRole
};
