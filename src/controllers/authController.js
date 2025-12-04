const userService = require('../services/userService');
const renderWithLayout = require('../utils/renderWithLayout');

exports.showRegister = (req, res) => {
  renderWithLayout(res, 'auth/register', {}, 'Реєстрація');
};

exports.register = async (req, res) => {
  try {
    const photoPath = req.file ? `img/${req.file.filename}` : null;
    const user = await userService.registerUser(req.body, photoPath);

    req.session.user = {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    res.redirect('/users');
  } catch (err) {
    renderWithLayout(res, 'auth/register', { error: err.message }, 'Реєстрація');
  }
};

exports.showLogin = (req, res) => {
  renderWithLayout(res, 'auth/login', {}, 'Логін');
};

exports.login = async (req, res) => {
  const user = await userService.authenticate(req.body.email, req.body.password);
  if (!user) {
    return renderWithLayout(
      res,
      'auth/login',
      { error: 'Невірний email або пароль' },
      'Логін'
    );
  }

  req.session.user = {
    id: user._id || user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };

  res.redirect('/users');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};
