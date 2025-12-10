const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../middleware/apiAuth");
const repo = require("../data/userRepository");

function validateRegister(body) {
  const errors = [];
  if (!body.name) errors.push("Name is required");
  if (!body.email) errors.push("Email is required");
  if (!body.password) errors.push("Password is required");
  return errors;
}

function validateLogin(body) {
  const errors = [];
  if (!body.email) errors.push("Email is required");
  if (!body.password) errors.push("Password is required");
  return errors;
}

exports.register = async (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length) return res.status(401).json({ errors });

  const { name, email, password } = req.body;
  const users = await repo.getAll();

  if (users.find(u => u.email === email))
    return res.status(401).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashed
  };

  await repo.create(newUser);

  const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({ user: newUser, token });
};

exports.login = async (req, res) => {
  const errors = validateLogin(req.body);
  if (errors.length) return res.status(401).json({ errors });

  const { email, password } = req.body;
  const users = await repo.getAll();

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ user, token });
};
