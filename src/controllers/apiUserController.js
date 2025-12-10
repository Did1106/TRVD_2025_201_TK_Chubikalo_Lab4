const repo = require("../data/userRepository");

function validateUser(body) {
  const errors = [];
  if (!body.name) errors.push("Name is required");
  if (!body.age) errors.push("Age is required");
  if (!body.city) errors.push("City is required");
  return errors;
}

exports.getAll = async (req, res) => {
  const users = await repo.getAll();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await repo.getById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.create = async (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length) return res.status(401).json({ errors });

  const newUser = {
    id: Date.now().toString(),
    name: req.body.name,
    age: Number(req.body.age),
    city: req.body.city,
    bio: req.body.bio || "",
    photo: "img/default.jpg"
  };

  await repo.create(newUser);
  res.status(201).json(newUser);
};

exports.update = async (req, res) => {
  const user = await repo.getById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const errors = validateUser(req.body);
  if (errors.length) return res.status(401).json({ errors });

  await repo.update(req.params.id, req.body);
  const updated = await repo.getById(req.params.id);
  res.json(updated);
};

exports.delete = async (req, res) => {
  const user = await repo.getById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await repo.remove(req.params.id);
  res.status(204).send();
};
