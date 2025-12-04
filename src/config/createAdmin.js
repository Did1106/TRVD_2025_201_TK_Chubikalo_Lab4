const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createAdmin() {
  const adminEmail = "admin@admin";
  const adminPassword = "admin";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) return; 

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await User.create({
    email: adminEmail,
    passwordHash,
    name: "Admin",
    role: "admin",
    age: 30,
    city: "AdminCity",
    bio: "Головний адміністратор",
    photo: "img/default.jpg"
  });

  console.log("✔ Адміністратор створений: admin@admin / admin");
}

module.exports = createAdmin;
